import React, { lazy, Suspense, useState, useEffect }  from "react";
import {Route, useHistory, Switch, BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Footer from "./components/Footer";
import api from "./utils/api";
import * as auth from "./utils/auth.js";
import {useSelector, useDispatch, Provider} from 'react-redux';
import store from './store';

import PopupWithForm from "./components/PopupWithForm";

const Register = lazy(() => import('auth/Register').catch(() => {
        return { default: () => <div className='error'>Auth is not available!</div> };
    })
);

const Login = lazy(() => import('auth/Login').catch(() => {
        return { default: () => <div className='error'>Auth is not available!</div> };
    })
);

const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
        return { default: () => <div className='error'>Auth is not available!</div> };
    })
);

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
        return { default: () => <div className='error'>Cards is not available!</div> };
    })
);

const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
        return { default: () => <div className='error'>Profile is not available!</div> };
    })
);

const AddPlacePopup = lazy(() => import('cards/AddPlacePopup').catch(() => {
        return { default: () => <div className='error'>Profile is not available!</div> };
    })
);

const ImagePopup = lazy(() => import('cards/ImagePopup').catch(() => {
        return { default: () => <div className='error'>Profile is not available!</div> };
    })
);

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const setCurrentUser = (user) => {
        dispatch({ type: 'setCurrentUser', payload: user });
    };
    const setCards = (cards) => {
        dispatch({ type: 'setCards', payload: cards });
    };
    const setIsLoggedIn = (state) => {
        dispatch({ type: 'setIsLoggedIn', payload: state });
    };
    const cards = useSelector((state) => state.cards);
    const isEditProfilePopupOpen = useSelector((state) => state.isEditProfilePopupOpen);
    const isAddPlacePopupOpen = useSelector((state) => state.isAddPlacePopupOpen);
    const isEditAvatarPopupOpen = useSelector((state) => state.isEditAvatarPopupOpen);
    const selectedCard = useSelector((state) => state.selectedCard);
    const isInfoToolTipOpen = useSelector((state) => state.isInfoToolTipOpen);
    const tooltipStatus = useSelector((state) => state.tooltipStatus);



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

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    return (
            <div className="page__content">
                <div>{selectedCard? selectedCard.link: 'Пусто!'}</div>
                <Header email={email} onSignOut={onSignOut}/>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        cards={cards}
                        loggedIn={isLoggedIn}
                    />
                    <Route path="/signup">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Register/>
                        </Suspense>
                    </Route>
                    <Route path="/signin">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Login/>
                        </Suspense>
                    </Route>
                </Switch>
                <Footer/>
                <Suspense fallback={<div>Loading...</div>}>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                    />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                    />
                </Suspense>
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                <Suspense fallback={<div>Loading...</div>}>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                    />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <ImagePopup card={selectedCard}/>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <InfoTooltip isOpen={isInfoToolTipOpen} status={tooltipStatus}/>
                </Suspense>
            </div>

    );
}
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>,
    document.getElementById("app"));
