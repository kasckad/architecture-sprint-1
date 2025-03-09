import React from 'react';
import PopupWithForm from '../../../shared/src/components/PopupWithForm';
import {CurrentUserContext} from '../../../shared/src/contexts/CurrentUserContext';
import api from "../api/profile";

function EditProfilePopup() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        handleUpdateUser({
            name,
            about: description,
        });
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

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    return (
        <PopupWithForm
            isOpen={isEditProfilePopupOpen} onSubmit={handleSubmit} onClose={closeAllPopups} title="Редактировать профиль" name="edit"
        >
            <label className="popup__label">
                <input type="text" name="userName" id="owner-name"
                       className="popup__input popup__input_type_name" placeholder="Имя"
                       required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
                       value={name || ''} onChange={handleNameChange}/>
                <span className="popup__error" id="owner-name-error"></span>
            </label>
            <label className="popup__label">
                <input type="text" name="userDescription" id="owner-description"
                       className="popup__input popup__input_type_description" placeholder="Занятие"
                       required minLength="2" maxLength="200"
                       value={description || ''} onChange={handleDescriptionChange}/>
                <span className="popup__error" id="owner-description-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
