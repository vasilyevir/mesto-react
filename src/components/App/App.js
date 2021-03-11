import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import {useState, useEffect} from 'react';
import api from '../../utils/Api'


function App() {
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);
    const [isSelectedCard, setIsSelectedCard] = useState('')

    const handleEditAvatarClick = () =>{        
        isEditAvatarPopupOpen();
    }

    const handleEditProfileClick = () =>{        
        isEditProfilePopupOpen();
    }

    const handleAddPlaceClick = () =>{        
        isAddPlacePopupOpen();
    }

    const handleCardClick = (data) =>{
        setIsSelectedCard(data)
        console.log(isSelectedCard);
    }



    const isEditProfilePopupOpen = () =>{
            setIsOpenEditProfile(true);
    }

    const isAddPlacePopupOpen = () =>{
            setIsOpenAddCard(true);
    }

    const isEditAvatarPopupOpen = () =>{
            setIsOpenEditAvatar(true);
    }

    const closeAllPopups = () => {
        setIsOpenAddCard(false);
        setIsOpenEditProfile(false);
        setIsOpenEditAvatar(false);
        setIsSelectedCard('');
    }

  return (
    <div className="root">
        <Header />
        <Main 
            onEditProfile ={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}
            onEditAvatar ={handleEditAvatarClick}
            onCloseAllPopups = {closeAllPopups}
            onHandleCardClick = {handleCardClick}
            isOpenAddCardForm = {isOpenAddCard}
            isOpenEditProfileForm = {isOpenEditProfile}
            isOpenEditAvatarForm = {isOpenEditAvatar}
            isSelectedCardForm = {isSelectedCard}
        />
        <Footer />

        
    </div>
  );
}

export default App;