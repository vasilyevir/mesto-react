import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory, Link} from 'react-router-dom';
import Header from './Header';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import InfoTooltip from "./InfoTooltip";

function Main(props){
    const currentUser = useContext(CurrentUserContext);
    // console.log(props)

    return(
    <>
    <Header>
        <div className="profile__user-content">
            <p className="profile__email">{props.user.email}</p>
            <Link className="login__link" onClick={props.signOut} to="/signin">Выйти</Link>
        </div>
    </Header>
    <div className="main">
        <section className="profile">
            <div className="profile__information">
                <div
                     className="profile__image-avatar"
                     style={{ backgroundImage: `url(${currentUser.avatar})` }}
                ></div>
                <div 
                    className="profile__image-avatar-effects"
                    onClick = {props.onEditAvatar}    
                ></div>
                <div className="profile__intro">
                    <div className="profile__top-row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                        className="profile__btn-edit" 
                        type="button"
                        onClick = {props.onEditProfile}
                        >
                        </button>
                    </div>
                <p className="profile__job">{currentUser.about}</p>
                </div>
            </div>
            <button 
                className="profile__btn-add" 
                type="button"
                onClick = {props.onAddPlace}    
            ></button>
            <EditProfilePopup 
                    isOpen={props.isOpenEditProfile} 
                    onClose={props.closeAllPopups} 
                    onUpdateUser={props.handleUpdateUser}
                    // onChangeInputName={handleChangeInputName}
                    // onChangeInputAbout={handleChangeInputAbout}
                />
                <EditAvatarPopup
                    isOpen={props.isOpenEditAvatar}
                    onClose={props.closeAllPopups}
                    onUpdateAvatar={props.handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={props.isOpenAddCard}
                    onClose={props.closeAllPopups}
                    onUpdateCard={props.handleUpdateCard}
                />
                <InfoTooltip
                    onClose={props.closeAllPopups}
                    image={props.infoTooltipImage}
                    text={props.infoTooltipText}
                    isOpenInfoTooltip={props.isOpenInfoTooltip}
                />
                {/* <ImagePopup
                    card = {props.isSelectedCard.link !== "" ? props.isSelectedCard : ""}
                    onClose = {props.closeAllPopups}
                /> */}
        </section>
            <section className="elements">
                {props.cards.map((item)=>
                    (<Card
                        key = {item._id}
                        onCardClick = {props.onHandleCardClick}
                        card = {item}
                        onCardLike={props.onHandleCardLike}
                        onCardDelete={props.onHandleCardDelete}
                    />)
                )}
            </section>
    </div>
    </>
    )
}

export default Main;  