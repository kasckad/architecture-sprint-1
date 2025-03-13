import React, { lazy, Suspense, useState, useEffect }  from "react";
import { Route, useHistory, Switch, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";

import { CurrentUserContext } from "shared-context_shared-library";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InfoTooltip from "./components/InfoTooltip";
import Main from "./components/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import PopupWithForm from "../../../src/components/PopupWithForm";
import api from "../../../src/utils/api";
import * as auth from "../../../src/utils/auth";

const Login =
    lazy(() => import('auth/Login').catch(() => {
            return { default: () => <div className='error'>Component Login is not available!</div> };
        })
    );

const Register =
    lazy(() => import('auth/Register').catch(() => {
            return { default: () => <div className='error'>Component Register is not available!</div> };
        })
    );

const AddPlacePopup =
    lazy(() => import('gallery/AddPlacePopup').catch(() => {
            return { default: () => <div className='error'>Component AddPlacePopup is not available!</div> };
        })
    );

const Card =
    lazy(() => import('gallery/Card').catch(() => {
            return { default: () => <div className='error'>Component Card is not available!</div> };
        })
    );

const ImagePopup =
    lazy(() => import('gallery/ImagePopup').catch(() => {
            return { default: () => <div className='error'>Component ImagePopup is not available!</div> };
        })
    );

const EditProfilePopup =
    lazy(() => import('gallery/EditProfilePopup').catch(() => {
            return { default: () => <div className='error'>Component EditProfilePopup is not available!</div> };
        })
    );

const EditAvatarPopup =
    lazy(() => import('gallery/EditAvatarPopup').catch(() => {
            return { default: () => <div className='error'>Component EditAvatarPopup is not available!</div> };
        })
    );

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const history = useHistory();

    useEffect(() => {
        addEventListener("authenticated", onLogin); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("authenticated", onLogin) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);

    useEffect(() => {
        addEventListener("registered", onRegister); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("registered", onRegister) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);


    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        api
            .getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function onLogin(event: Event) {
        const detail = (event as CustomEvent).detail
        if(detail.success) {
            localStorage.setItem('jwt', detail.token);
            setIsLoggedIn(true);
            setEmail(email);
            history.push("/");
        } else {
            setTooltipStatus("fail");
            setIsInfoToolTipOpen(true);
        }
    }

    function onRegister(event: Event) {
        const detail = (event as CustomEvent).detail
        if(detail.success) {
            setTooltipStatus("success");
            setIsInfoToolTipOpen(true);
            history.push("/signin");
        } else {
            setTooltipStatus("fail");
            setIsInfoToolTipOpen(true);
        }
    }

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut} />
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
                        <Register />
                    </Route>
                    <Route path="/signin">
                        <Login />
                    </Route>
                </Switch>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups}
                />
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    status={tooltipStatus}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);