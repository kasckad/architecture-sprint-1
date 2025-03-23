import React, {lazy} from 'react';

const Cards = lazy(() => import('photo/Cards'));
const Profile = lazy(() => import('authentication/Profile'));
// Компонент с профилем пользователя и его загруженными Местами
// @ts-ignore
function Main({onAddPlace, currentUser}) {
    return (
        <main className="content">
            <section className="profile page__section">
                <Profile currentUser={currentUser}/>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <Cards currentUser={currentUser}/>
        </main>
    )
        ;
}

export default Main;
