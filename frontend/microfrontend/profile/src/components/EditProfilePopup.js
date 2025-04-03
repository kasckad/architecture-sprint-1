import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import api from "../utils/api";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen }) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const closeAllPopups = (state) => {
    dispatch({ type: 'closeAllPopups', payload: state });
  };
  const currentUser = useSelector((state) => state.currentUser);
  const setCurrentUser = (user) => {
    dispatch({ type: 'setCurrentUser', payload: user });
  };

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function onUpdateUser(userUpdate) {
    api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleClose() {
    closeAllPopups();
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleClose} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"
               value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
