import Card from './Card';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const [setSelectedCard] = React.useState(null);
const [cards, setCards] = React.useState([]);
const currentUser = React.useContext(CurrentUserContext);

function handleCardClick(card) {
    setSelectedCard(card);
}

function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((cards) =>
                cards.map((c) => (c._id === card._id ? newCard : c))
            );
        })
        .catch((err) => console.log(err));
}

function handleCardDelete(card) {
    api
        .removeCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(err));
}

export default function PlacesSection() {
    return (
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </ul>
        </section>
    )
}
