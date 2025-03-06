import React, { lazy } from 'react';

const AddPlaceButton = lazy(() => import('cards/AddPlaceButton').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const CardsList = lazy(() => import('cards/CardsList').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Profile = lazy(() => import('profile/Profile').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

function Main({ loggedIn }) {
  return (
    <main className="content">
      <section className="profile page__section">
        {loggedIn && (
          <Profile/>
        )}

        <AddPlaceButton />
      </section>
      <section className="places page__section">
        <CardsList />
      </section>
    </main>
  );
}

export default Main;
