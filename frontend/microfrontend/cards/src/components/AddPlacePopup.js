import React from 'react';
import api from "../utils/api";
import {useSelector, useDispatch} from 'react-redux';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const closeAllPopups = (state) => {
    dispatch({ type: 'closeAllPopups', payload: state });
  };
  const setCards = (cards) => {
    dispatch({ type: 'setCards', payload: cards });
  };

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function onAddPlace(newCard) {
    api
        .addCard(newCard)
        .then((newCardFull) => {
          setCards([newCardFull, ...cards]);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  function handleClose() {
    closeAllPopups();
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleClose} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
