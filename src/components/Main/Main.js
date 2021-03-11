import {useState, useEffect} from 'react';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import api from '../../utils/Api'
import Card from '../Card/Card'


function Main(props){
    const [info, setInfo] = useState([])
    const [cards, setCards] = useState([])

    // const handleRequest = () =>{
    //     api.getInformation()
    //         .then(data => {
    //                 console.log(data);
    //                 setInfo(data)
    //             })
    //             // setInfo(meInfo);
    //             // console.log(info);
    // }

    // handleRequest();
    // console.log(info);
    useEffect (()=>{
        api.getInformation()
            .then(data => {
                // console.log(data);
                setInfo(data);
            })
    }, [])

    useEffect (()=>{
        api.getCards()
            .then(data =>{
                setCards(data);
            })
    }, [])
    // console.log(cards);

    // console.log(<Card/>);

    return(
    <div>
        <section className="profile">
            <div className="profile__information">
                <div
                    //  src="url(${info.avatar})"
                    //  alt="Логотип" 
                     className="profile__image-avatar"
                     style={{ backgroundImage: `url(${info.avatar})` }}
                ></div>
                <div 
                    className="profile__image-avatar-effects"
                    onClick = {props.onEditAvatar}    
                ></div>
                <div className="profile__intro">
                    <div className="profile__top-row">
                        <h1 className="profile__name">{info.name}</h1>
                        <button 
                        className="profile__btn-edit" 
                        type="button"
                        onClick = {props.onEditProfile}
                        ></button>
                    </div>
                <p className="profile__job">{info.about}</p>
                </div>
            </div>
            <button 
                className="profile__btn-add" 
                type="button"
                onClick = {props.onAddPlace}    
            ></button>
        </section>
        <PopupWithForm 
            btnCloseClick = {props.onCloseEditProfile}
            isOpen= {props.isOpenEditProfileForm}
            onClose = {props.onCloseAllPopups}
            name="edit"
            children={<>
                <h2 className="popup__text popup__text_type_form">Редактировать профиль</h2>
                    <div className="popup__input-area">    
                        <input required minLength="2" maxLength="40" type="text" className="popup__input popup__input_value_name" id="name" name="name" placeholder="Имя"/>
                        <span id="name-error" className="popup__error"></span>
                    </div>
                    <div className="popup__input-area">
                        <input required minLength="2" maxLength="200" type="text" className="popup__input popup__input_value_job" id="about" name="about" placeholder="О себе"/>
                        <span id="about-error" className="popup__error"></span>
                    </div>
                    <button className="popup__btn-save" value="Сохранить" type="submit" name="closeEdit">
                        Сохранить
                    </button>
            </>}
        />
        <ImagePopup
            card = {props.isSelectedCardForm}
            onClose = {props.onCloseAllPopups}
        />
        <PopupWithForm 
            btnCloseClick = {props.onCloseAddPlace}
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
        />
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
        <PopupWithForm
            btnCloseClick = {props.onCloseEditAvatar}
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
        />
        <section className="elements">
             {cards.map((item, i)=>
                 <Card
                    key = {i}
                    onCardClick = {props.onHandleCardClick}
                    card = {item}
                 />
             )}
        </section>
    </div>
    )
}

export default Main;  