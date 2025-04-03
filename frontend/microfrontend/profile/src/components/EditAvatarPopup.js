import React from 'react';
import api from "../utils/api";
import {useSelector, useDispatch} from 'react-redux';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen }) {
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const setCurrentUser = (user) => {
    dispatch({ type: 'setCurrentUser', payload: user });
  };
  const closeAllPopups = (state) => {
    dispatch({ type: 'closeAllPopups', payload: state });
  };
  function onUpdateAvatar(avatarUpdate) {
    api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleClose() {
    closeAllPopups();
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleClose} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
