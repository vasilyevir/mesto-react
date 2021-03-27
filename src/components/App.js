import logo from '../logo.svg';
import Header from './Header'
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import {useState, useEffect} from 'react';
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext';
import CurrentCardContext from '../contexts/CurrentCardContext';


function App() {
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);
    const [isSelectedCard, setIsSelectedCard] = useState({name: '', link: ''})
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);

    console.log(isSelectedCard.link)


    useEffect(()=>{
        api.getInformation()
        .then(data => {
            setCurrentUser(data);
        })
        .catch((err)=>{console.log(err)})

    },[])

    useEffect(()=>{
        api.getCards()
        .then(data => {
            setCurrentCards(data);
        })
        .catch((err)=>{console.log(err)})
    },[])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        
        api.postLike(card._id, !isLiked).then((newCard) => {
            setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err)=>{console.log(err)}) 
    }

    const handleCardDelete = (cardId) =>{
        const cards = currentCards.filter(card => card._id !== cardId);
        // console.log(cards);

        api.deleteCard(cardId)
            .then(() =>{
                setCurrentCards(cards)
            })
    }

    const handleUpdateCard = (obj) =>{
        api.postCard(obj)
            .then(newCard => {
                setCurrentCards([newCard, ...currentCards]);
            })
            .catch((err)=>{console.log(err)})
    }

    const handleUpdateAvatar = (props) =>{
        api.changeAvatar(props)
            .then(data =>{
                setCurrentUser(data);
            })
            .catch((err)=>{console.log(err)})
    }

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
        // console.log(isSelectedCard);
    }

    const handleUpdateUser = (data) =>{
        api.changeProfile(data)
            .then(data =>{
                setCurrentUser(data);
            })
            .catch((err)=>{console.log(err)})
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
        setIsSelectedCard({name: '', link: ''});
    }

  return (
    <div className="root">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentCardContext.Provider value={[currentCards, setCurrentCards]}>
                <Main 
                    onEditProfile ={handleEditProfileClick}
                    onAddPlace ={handleAddPlaceClick}
                    onEditAvatar ={handleEditAvatarClick}
                    onCloseAllPopups = {closeAllPopups}
                    onHandleCardClick = {handleCardClick}
                    onHandleCardLike = {handleCardLike}
                    onHandleCardDelete = {handleCardDelete}
                    isSelectedCardForm = {isSelectedCard}
                    cards={currentCards}
                />
                <EditProfilePopup 
                    isOpen={isOpenEditProfile} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser}
                    // onChangeInputName={handleChangeInputName}
                    // onChangeInputAbout={handleChangeInputAbout}
                />
                <EditAvatarPopup
                    isOpen={isOpenEditAvatar}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isOpenAddCard}
                    onClose={closeAllPopups}
                    onUpdateCard={handleUpdateCard}
                />
                <ImagePopup
                    card = {isSelectedCard.link !== "" ? isSelectedCard : ""}
                    onClose = {closeAllPopups}
                />
            </CurrentCardContext.Provider>
        </CurrentUserContext.Provider>
        <Footer />

        
    </div>
  );
}

export default App;