import React from 'react';
// @ts-ignore
import SuccessIcon from '../images/success-icon.svg';
// @ts-ignore
import ErrorIcon from '../images/error-icon.svg';

// Функция по обработке сообщения об регистрации
// @ts-ignore
function InfoTooltip({ isOpen, onClose, status }) {
  const icon = status === 'success' ? SuccessIcon : ErrorIcon
  const text = status === 'success' ? "Вы успешно зарегистрировались" : 
     "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
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

 