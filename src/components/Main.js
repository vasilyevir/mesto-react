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
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);
    const [isSelectedCard, setIsSelectedCard] = useState({name: '', link: ''})
    // console.log(props)

        const handleEditAvatarClick = () =>{        
            isEditAvatarPopupOpen();
        }
    
        const handleEditProfileClick = () =>{        
            isEditProfilePopupOpen();
        }
    
        const handleAddPlaceClick = () =>{        
            isAddPlacePopupOpen();
        }

    const isEditAvatarPopupOpen = () =>{
        setIsOpenEditAvatar(true);
    }

    const isEditProfilePopupOpen = () =>{
        setIsOpenEditProfile(true);
}

    const isAddPlacePopupOpen = () =>{
            setIsOpenAddCard(true);
    }

    const handleCardClick = (data) =>{
        setIsSelectedCard(data)
    }

    const closeAllPopups = () => {
        setIsOpenAddCard(false);
        setIsOpenEditProfile(false);
        setIsOpenEditAvatar(false);
        // setIsOpenInfoTooltip(false);
        setIsSelectedCard({name: '', link: ''});
    }

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
                    onClick = {handleEditAvatarClick}    
                ></div>
                <div className="profile__intro">
                    <div className="profile__top-row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                        className="profile__btn-edit" 
                        type="button"
                        onClick = {handleEditProfileClick}
                        >
                        </button>
                    </div>
                <p className="profile__job">{currentUser.about}</p>
                </div>
            </div>
            <button 
                className="profile__btn-add" 
                type="button"
                onClick = {handleAddPlaceClick}    
            ></button>
            <EditProfilePopup 
                    isOpen={isOpenEditProfile} 
                    onClose={closeAllPopups} 
                    onUpdateUser={props.handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isOpenEditAvatar}
                    onClose={closeAllPopups}
                    onUpdateAvatar={props.handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isOpenAddCard}
                    onClose={closeAllPopups}
                    onUpdateCard={props.handleUpdateCard}
                />
                <InfoTooltip
                    onClose={props.closeInfoTooltipPopup}
                    image={props.infoTooltipImage}
                    text={props.infoTooltipText}
                    isOpenInfoTooltip={props.isOpenInfoTooltip}
                />
                <ImagePopup
                    card = {isSelectedCard.link !== "" ? isSelectedCard : ""}
                    onClose = {closeAllPopups}
                />
        </section>
            <section className="elements">
                {props.cards.map((item)=>
                    (<Card
                        key = {item._id}
                        onCardClick = {handleCardClick}
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