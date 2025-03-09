import React, {lazy} from 'react';

const Cards = lazy(() => import('cards/Cards').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

const Profile = lazy(() => import('profile/Profile').catch(() => {
        return {default: () => <div className='error'>Component is not available!</div>};
    })
);

function Main() {
  return (
    <main className="content">
      <Profile/>
      <Cards/>
    </main>
  );
}

export default Main;
