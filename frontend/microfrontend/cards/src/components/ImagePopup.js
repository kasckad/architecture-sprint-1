import React from 'react';
import {useDispatch} from 'react-redux';

function ImagePopup({ card }) {
    const dispatch = useDispatch();
    const closeAllPopups = (state) => {
        dispatch({ type: 'closeAllPopups', payload: state });
    };
    function handleClose() {
        closeAllPopups();
    }
  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={handleClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
