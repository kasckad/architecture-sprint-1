import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

const [isAddPlacePopupOpen] = React.useState(false);
const [cards, setCards] = React.useState([]);
const [selectedCard] = React.useState(null);

function closeAllPopups() {
}

function handleAddPlaceSubmit(newCard) {
    api
        .addCard(newCard)
        .then((newCardFull) => {
            setCards([newCardFull, ...cards]);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
}

export default function GalleryPopups() {
    return (
        <div>
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closeAllPopups}
            />
            <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    );
}
