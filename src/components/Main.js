import {useState, useEffect, useContext} from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props){
    const currentUser = useContext(CurrentUserContext);
    // const [currentCard, setCurrentCard] = useContext(CurrentCardContext);



    // function handleCardLike(card) {
    //     // Снова проверяем, есть ли уже лайк на этой карточке
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    //     // Отправляем запрос в API и получаем обновлённые данные карточки
        
    //     api.postLike(card._id, !isLiked).then((newCard) => {
    //         setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
    //     });
    // } 

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
        <ImagePopup
            card = {props.isSelectedCardForm}
            onClose = {props.onCloseAllPopups}
        />
        {/* <PopupWithForm 
            name="add"
            onClose = {props.onCloseAllPopups}
            isOpen={props.isOpenAddCardForm}
            children= {
                <>
                    <h2 className="popup__text popup__text_type_form">Новое место</h2>
                    <div className="popup__input-area">
                        <input required minLength="2" maxLength="30" type="text" className="popup__input popup__input_value_name-image" name="nameCard" id="nameCard" placeholder="Название"/>
                        <span id="nameCard-error" className="popup__error"></span>
                    </div>
                    <div className="popup__input-area">
                        <input required type="url" className="popup__input popup__input_value_url" name="imgCard" id="imgCard" placeholder="Ссылка на картинку"/>
                        <span id="imgCard-error" className="popup__error"></span>
                    </div>
                    <button className="popup__btn-save" value="" type="submit" id="addButton">
                        Создать
                    </button>
                </>
            }
        /> */}
        <PopupWithForm
            name="confidence"
            children={
                <>
                    <h2 className="popup__text popup__text_type_form">Вы уверены?</h2>
                    <button className="popup__btn-save" type="submit">
                        Да
                    </button>
                </>
            }
        />
        {/* <PopupWithForm
            name="avatar"
            onClose = {props.onCloseAllPopups}
            isOpen={props.isOpenEditAvatarForm}
            children = {
                <>
                    <h2 className="popup__text popup__text_type_form">Обновить аватар</h2>
                    <div className="popup__input-area">
                        <input required type="url" className="popup__input popup__input_value_url" name="imgAvatar" id="imgAvatar" placeholder="Ссылка на аватарку"/>
                        <span id="imgAvatar-error" className="popup__error"></span>
                    </div>
                    <button className="popup__btn-save" type="submit">
                        Сохранить
                    </button>
                </>
            }
        /> */}

            <section className="elements">
                {props.cards.map((item, i)=>
                    <Card
                        key = {i}
                        onCardClick = {props.onHandleCardClick}
                        card = {item}
                        onCardLike={props.onHandleCardLike}
                        onCardDelete={props.onHandleCardDelete}
                    />
                )}
            </section>
    </div>
    )
}

export default Main;  