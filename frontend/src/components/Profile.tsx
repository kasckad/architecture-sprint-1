import React from "react";
import EditAvatarPopup from "./EditAvatarPopup.tsx";
import EditProfilePopup from "./EditProfilePopup.tsx";
import api from "../utils/api";

// @ts-ignore
export default function Profile({currentUser}) {
    const imageStyle = {backgroundImage: `url(${currentUser.avatar})`};

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function closeEditProfilePopup() {
        setIsEditProfilePopupOpen(false);
    }

    function closeEditAvatarPopup() {
        setIsEditAvatarPopupOpen(false);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateAvatar(avatarUpdate: any) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData: any) => {
                currentUser.name = newUserData.name;
                currentUser.about = newUserData.about;
                currentUser.avatar = newUserData.avatar;
                closeEditAvatarPopup();
            })
            .catch((err: any) => console.log(err));
    }

    function handleUpdateUser(userUpdate: any) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData: any) => {
                currentUser.name = newUserData.name;
                currentUser.about = newUserData.about;
                currentUser.avatar = newUserData.avatar;
                closeEditProfilePopup();
            })
            .catch((err: any) => console.log(err));
    }

    return <section className="profile page__section">
        <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
        <div className="profile profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
            <p className="profile__description">{currentUser.about}</p>
        </div>
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeEditAvatarPopup}
        />
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeEditProfilePopup}
            currentUser={currentUser}
        />
    </section>
}