import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';

// Функция по добавлению нового Места через отдельную форму с вводом названия и сссылки на картинку
// @ts-ignore
function AddPlacePopup({ isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
        .addCard({link: link, name: name})
        .then((newCardFull) => {
          // @ts-ignore
          setCards([newCardFull, ...cards]);
        })
        .catch((err: any) => console.log(err));
    onClose();
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength={1} maxLength={30} value={name} onChange={handleNameChange} />
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
