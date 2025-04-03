import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import { useDispatch } from 'react-redux';

function InfoTooltip(props) {
  const dispatch = useDispatch();
  const closeAllPopups = (state) => {
    dispatch({ type: 'closeAllPopups', payload: state });
  };
  function handleClose(){
    closeAllPopups()
  }
  const icon = props.status === 'success' ? SuccessIcon : ErrorIcon
  const text = props.status === 'success' ? "Вы успешно зарегистрировались" :
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${props.isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={handleClose}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;

 