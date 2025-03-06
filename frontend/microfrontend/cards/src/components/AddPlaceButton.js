import React from 'react'
import events from '../utils/events'

function AddPlaceButton () {
  function onClick() {
    const event = new CustomEvent(events.ADD_PLACE_EVENT);
    document.dispatchEvent(event);
  }

  return (
    <button className="profile__add-button" type="button" onClick={onClick}></button>
  )
}

export default AddPlaceButton;