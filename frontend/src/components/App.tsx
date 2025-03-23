import React from "react";
import {Route, useNavigate, Routes, Navigate} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import * as auth from "../utils/auth";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const AddPlacePopup = React.lazy(() => import("photo/AddPlacePopup"));

const Register = React.lazy(() => import("authentication/Register"));
const Login = React.lazy(() => import("authentication/Login"));
const InfoTooltip = React.lazy(() => import("authentication/InfoTooltip"));

// Основная функция для сборки приложения. Содержит все функции: Хедер, профиль, места
function App() {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const history = useNavigate();

    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        api
            .getAppInfo()
            // @ts-ignore
            .then(([userData]) => {
                setCurrentUser(userData);
            })
            .catch((err: any) => console.log(err));
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
                    history("/");
                })
                .catch((err: any) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsInfoToolTipOpen(false);
    }

    // @ts-ignore
    function onRegister({email, password}) {
        auth
            .register(email, password)
            .then((res: Response) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                history("/signup");
            })
            .catch((err: any) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    // @ts-ignore
    function onLogin({email, password}) {
        auth
            .login(email, password)
            .then((res: Response) => {
                setIsLoggedIn(true);
                setEmail(email);
                history("/");
            })
            .catch((err: any) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history("/signin");
    }

  return (
      // В компонент App внедрён контекст через CurrentUserContext.Provider
      // @ts-ignore
      // eslint-disable-next-line react/jsx-no-undef
      <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut} />
                <Routes>
                    {isLoggedIn ? (
                        <Route path="/"
                               element={<Main
                                   onAddPlace={handleAddPlaceClick}
                                   currentUser={currentUser}
                               />}
                        />
                    ) : (
                        <Route path="/login" element={<Navigate to="/signin" />} />
                    )}
                    <Route path="/signup" element={ <Register onRegister={onRegister}/> }/>
                    <Route path="/signin" element={ <Login onLogin={onLogin}/> }/>
                </Routes>
                <Footer/>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />
                <PopupWithForm title="Вы уверены?"
                               name="remove-card"
                               buttonText="Да"
                               isOpen={false}
                               onSubmit={() => {}}
                               onClose={() => {}}
                               children=""
                />
                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    status={tooltipStatus}
                />
            </div>
        {/* @ts-ignore*/}
        </CurrentUserContext.Provider>
    );
}

export default App;
