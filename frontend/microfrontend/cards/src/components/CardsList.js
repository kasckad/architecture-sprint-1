import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import events from '../utils/events'
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

import '../blocks/places/places.css';
import '../blocks/card/card.css';

function CardsList() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  function closePopup() {
    setSelectedCard(null)
    setIsAddPlacePopupOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .getAppInfo()
      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const listener = () => setIsAddPlacePopupOpen(true)

    document.addEventListener(events.ADD_PLACE_EVENT, listener);

    return () => {
      document.removeEventListener(events.ADD_PLACE_EVENT, listener);
    }
  }, []);

  return (
    <>
      <ul className="places__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            currentUser={currentUser}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </ul>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closePopup}
      />

      <ImagePopup card={selectedCard} onClose={closePopup} />
    </>
  )
}

export default CardsList;