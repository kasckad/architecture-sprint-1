import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import '../style/profile/profile.css';

export default function ProfileControl() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const setIsEditProfilePopupOpen = (state) => {
        dispatch({ type: 'setIsEditProfilePopupOpen', payload: state });
    };
    const setIsEditAvatarPopupOpen = (state) => {
        dispatch({ type: 'setIsEditAvatarPopupOpen', payload: state });
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    if (!currentUser) return null;
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
    return (
        <>
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
        </>
    )
}