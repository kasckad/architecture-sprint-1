import React, {lazy, Suspense} from 'react';
import {useDispatch} from "react-redux";

const ProfileControl = lazy(() => import('profile/ProfileControl').catch(() => {
        return { default: () => <div className='error'>Profile is not available!</div> };
    })
);

const Card = lazy(() => import('cards/Card').catch(() => {
        return { default: () => <div className='error'>Profile is not available!</div> };
    })
);

function Main({ cards }) {
    const dispatch = useDispatch();
    const setIsAddPlacePopupOpen = (state) => {
        dispatch({ type: 'setIsAddPlacePopupOpen', payload: state });
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
  return (
    <main className="content">
      <section className="profile page__section">
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileControl/>
          </Suspense>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="places page__section">
          <ul className="places__list">
              {cards.map((card) => (
                  <Suspense key={card._id} fallback={<div>Loading...</div>}>
                      <Card
                          key={card._id}
                          card={card}
                      />
                  </Suspense>
              ))}
          </ul>
      </section>
    </main>
  );
}

export default Main;
