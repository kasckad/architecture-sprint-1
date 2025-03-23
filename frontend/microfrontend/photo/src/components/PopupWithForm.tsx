import React from 'react';

// Компонент просто отвечаюший за попап
// @ts-ignore
class PopupWithForm extends React.Component<{
  title: any,
  name: any,
  isOpen: any,
  buttonText: string,
  onSubmit: any,
  onClose: any,
  children: any
}> {
  static defaultProps = {buttonText: 'Сохранить'}

  render() {
    let {
      title,
      name,
      isOpen,
      buttonText,
      onSubmit,
      onClose,
      children,
    } = this.props;
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
          <div className="popup__content">
            <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
              <button type="button" className="popup__close" onClick={onClose}></button>
              <h3 className="popup__title">{title}</h3>
              {children}
              <button type="submit" className="button popup__button">{buttonText}</button>
            </form>
          </div>
        </div>
    );
  }
}

export default PopupWithForm;
