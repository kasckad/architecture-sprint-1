import React, { lazy }  from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {CurrentUserContext} from "../../../src/contexts/CurrentUserContext";
import Header from "../src/components/Header";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Main from "../src/components/Main";
import Footer from "../src/components/Footer";

const Login = lazy(() => import('auth/Login').catch(() => {
        return { default: () => <div className='error'>Component Login is not available!</div> };
    })
);

const Register = lazy(() => import('auth/Register').catch(() => {
        return { default: () => <div className='error'>Component Register is not available!</div> };
    })
);

const GalleryPopups = lazy(() => import('gallery/GalleryPopups').catch(() => {
        return { default: () => <div className='error'>Component GalleryPopups is not available!</div> };
    })
);

const ProfilePopups = lazy(() => import('gallery/ProfilePopups').catch(() => {
        return { default: () => <div className='error'>Component ProfilePopups is not available!</div> };
    })
);

const [setCards] = React.useState([]);

// В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
const [currentUser, setCurrentUser] = React.useState({});

const [setIsLoggedIn] = React.useState(false);
//В компоненты добавлены новые стейт-переменные: email — в компонент App
const [email, setEmail] = React.useState("");

const history = useHistory();

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

function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
}

const App = () => {
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
                    />
                    <Route path="/signup">
                        <Register/>
                    </Route>
                    <Route path="/signin">
                        <Login/>
                    </Route>
                </Switch>
                <Footer />
                <GalleryPopups />
                <ProfilePopups />
            </div>
        </CurrentUserContext.Provider>
    );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
