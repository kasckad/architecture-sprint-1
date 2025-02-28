import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("auth/Login"));
const Register = lazy(() => import("auth/Register"));

function App() {
    // 🟢 Состояние попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

    // 🟢 Данные пользователя и карточек
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    // 🔥 Загружаем данные пользователя и карточек при старте
    React.useEffect(() => {
        api.getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    // 🔥 Проверка токена при загрузке приложения
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            fetch("https://auth.nomoreparties.co/users/me", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
                .then((res) => {
                    setIsLoggedIn(true);
                    setCurrentUser(res.data);
                })
                .catch((err) => {
                    console.error("⛔ Ошибка при проверке токена:", err);
                    localStorage.removeItem("jwt");
                });
        }
    }, []);

    // 🟢 Функции открытия попапов
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // 🟢 Функция закрытия всех попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    // 🟢 Функции работы с API
    function handleUpdateUser(userUpdate) {
        api.setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api.setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api.addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    // 🟢 Обработчик выхода из аккаунта
    function onSignOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
    }

    // 🟢 Обработчик тултипа (успех / ошибка)
    function handleShowTooltip(status) {
        setTooltipStatus(status);
        setIsInfoToolTipOpen(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={currentUser?.email || ""} onSignOut={onSignOut} />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        loggedIn={isLoggedIn}
                    />
                    <Route path="/signup">
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Register showTooltip={handleShowTooltip} />
                        </Suspense>
                    </Route>
                    <Route path="/signin">
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Login showTooltip={handleShowTooltip} setIsLoggedIn={setIsLoggedIn} />
                        </Suspense>
                    </Route>
                </Switch>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isOpen={isInfoToolTipOpen} status={tooltipStatus} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
