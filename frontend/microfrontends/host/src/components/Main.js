import React, {lazy} from 'react';

const ProfileSection = lazy(() => import('profile/ProfileSection').catch(() => {
        return { default: () => <div className='error'>Component ProfileSection is not available!</div> };
    })
);

const PlacesSection = lazy(() => import('profile/PlacesSection').catch(() => {
        return { default: () => <div className='error'>Component PlacesSection is not available!</div> };
    })
);

function Main() {
  return (
    <main className="content">
      <ProfileSection></ProfileSection>
      <PlacesSection></PlacesSection>
    </main>
  );
}

export default Main;
