import React from "react";
import Card from "./Card";
import api from "../utils/api";
import ImagePopup from "./ImagePopup.tsx";

// @ts-ignore
export default function Cards({currentUser}) {
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    React.useEffect(() => {
        api
            .getAppInfo()
            // @ts-ignore
            .then(([cardData, userData]) => {
                setCards(cardData);
            })
            .catch((err: any) => console.log(err));
    }, []);

    function handleCardClick(card: any) {
        setSelectedCard(card);
    }

    function handleCardLike(card: any) {
        // @ts-ignore
        const isLiked = card.likes.some((i: { _id: any; }) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard: any) => {
                setCards((cards: any) =>
                    cards.map((c: any) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err: any) => console.log(err));
    }

    function handleCardDelete(card: any) {
        api
            .removeCard(card._id)
            .then(() => {
                // @ts-ignore
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err: any) => console.log(err));
    }

    function closePoppup() {
        setSelectedCard(null);
    }

    return <section className="places page__section">
        <ul className="places__list">
            {cards.map((card: any) => (
                <Card
                    key={card._id}
                    card={card}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    currentUser={currentUser}
                />
            ))}
        </ul>
        <ImagePopup card={selectedCard} onClose={closePoppup} />
    </section>
}