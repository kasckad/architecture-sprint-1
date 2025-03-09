import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "@shared-context/shared-data/src/context/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

const UserLogin = lazy(() => import('auth/Login').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const UserRegister = lazy(() => import('auth/Register').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const AddPlacePopup = lazy(() => import('cards/AddPlacePopup').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const ImagePopup = lazy(() => import('cards/ImagePopup').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const PopupWithForm = lazy(() => import('shared/PopupWithForm').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);


function App() {
    const currentUser = React.useContext(CurrentUserContext);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);


    return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header/>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                    />
                    <Route path="/signup">
                        <UserRegister/>
                    </Route>
                    <Route path="/signin">
                        <UserLogin/>
                    </Route>
                </Switch>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen}/>
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}/>
                <ImagePopup/>
                <InfoTooltip isOpen={isInfoToolTipOpen}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
