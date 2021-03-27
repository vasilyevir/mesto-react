import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props){
    const currentUser = useContext(CurrentUserContext);

    return(
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
        </section>
            <section className="elements">
                {props.cards.map((item, i)=>
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
    )
}

export default Main;  