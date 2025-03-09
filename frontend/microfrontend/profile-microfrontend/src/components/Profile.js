import React from 'react';
import {CurrentUserContext} from '../../../shared/src/contexts/CurrentUserContext';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

function Profile() {
    const currentUser = React.useContext(CurrentUserContext);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const imageStyle = {backgroundImage: `url(${currentUser.avatar})`};

    return (
        <section className="profile page__section">
            <div className="profile__image" onClick={EditAvatarPopup} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={EditProfilePopup}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={setIsAddPlacePopupOpen(true)}></button>
        </section>
    );
}

export default Profile;
