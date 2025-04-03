import {applyMiddleware, createStore} from 'redux';

const initialState = {
    // User state
    currentUser: null,

    // Cards state
    cards: [],

    // Popups state
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isImagePopupOpen: false,
    selectedCard: null,
    isInfoToolTipOpen: false,
    isLoggedIn: false,
    tooltipStatus: ""

};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'setCards':
            return {...state, cards: action.payload};
        case 'addCard':
            return {...state, cards: [action.payload, ...state.cards]};
        case 'removeCard':
            return {...state, cards: state.cards.filter(card => card._id !== action.payload)};
        case 'setCurrentUser':
            return {...state, currentUser: action.payload};
        case 'setIsInfoToolTipOpen':
            return { ...state, isInfoToolTipOpen: action.payload };
        case 'setIsEditProfilePopupOpen':
            return { ...state, isEditProfilePopupOpen: action.payload };
        case 'setIsAddPlacePopupOpen':
            return { ...state, isAddPlacePopupOpen: action.payload };
        case 'setIsEditAvatarPopupOpen':
            return { ...state, isEditAvatarPopupOpen: action.payload };
        case 'setSelectedCard':
            return { ...state, selectedCard: action.payload };
        case 'setTooltipStatus':
            return { ...state, tooltipStatus: action.payload };
        case 'setIsLoggedIn':
            return { ...state, isLoggedIn: action.payload };
        case 'closeAllPopups':
            return {
                ...state,
                isEditProfilePopupOpen: false,
                isAddPlacePopupOpen: false,
                isEditAvatarPopupOpen: false,
                isImagePopupOpen: false,
                isInfoToolTipOpen: false
            };
        default:
            return state;
    }
}

// Создаем store
const store = createStore(
    rootReducer
);

export default store;