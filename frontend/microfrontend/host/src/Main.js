import React from 'react';
import Card from './Card';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    const UsersTestControl = lazy(() => import('users/UsersTestControl').catch(() => {
            return { default: () => <div className='error'>Component is not available!</div> };
        })
    );

    return (
    <main className="content">
    <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
