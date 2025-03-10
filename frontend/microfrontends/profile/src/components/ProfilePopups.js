import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import React from "react";
import api from "../utils/api";

const [isEditProfilePopupOpen] = React.useState(false);
const [setCurrentUser] = React.useState({});
const [isEditAvatarPopupOpen] = React.useState(false);
const [isInfoToolTipOpen] = React.useState(false);
const [tooltipStatus] = React.useState("");

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

function closeAllPopups() {
}

export default function ProfilePopups() {
    return (
        <div>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
            />
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                status={tooltipStatus}
            />
        </div>
    );
}
