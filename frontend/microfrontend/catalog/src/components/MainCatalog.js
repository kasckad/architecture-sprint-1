import React from 'react';
import Card from './Card';

function MainCatalog({ cards, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    return (
        <main className="content">
                <button className="place__add-button" type="button" onClick={onAddPlace}></button>
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

export default MainCatalog;
