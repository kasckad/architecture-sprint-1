import React from 'react';
import Card from "./Card";
import api from "../api/card"

function Cards() {

    return (
            <section className="places page__section">
                <ul className="places__list">
                    {api.getCardList().map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                        />
                    ))}
                </ul>
            </section>
    );
}

export default Cards;
