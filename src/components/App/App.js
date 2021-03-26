import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup'
import {useState, useEffect} from 'react';
import api from '../../utils/Api'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentCardContext from '../../contexts/CurrentCardContext';


function App() {
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);
    const [isSelectedCard, setIsSelectedCard] = useState('')
    const [currentUser, setCurrentUser] = useState('');
    const [currentCard, setCurrentCard] = useState([]);



    useEffect(()=>{
        api.getInformation()
        .then(data => {
            setCurrentUser(data);
        })
    },[])

    useEffect(()=>{
        api.getCards()
        .then(data => {
            setCurrentCard(data);
        })
    },[])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        
        api.postLike(card._id, !isLiked).then((newCard) => {
            setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleCardDelete = (cardId) =>{
        const cards = currentCard.filter(card => card._id !== cardId);
        // console.log(cards);

        api.deleteCard(cardId)
            .then(() =>{
                setCurrentCard(cards)
            })
    }

    const handleUpdateCard = (obj) =>{
        api.postCard(obj)
            .then(newCard => {
                setCurrentCard([newCard, ...currentCard]);
            })
    }

    const handleUpdateAvatar = (props) =>{
        api.changeAvatar(props)
            .then(data =>{
                setCurrentUser(data);
            })
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
        console.log(isSelectedCard);
    }

    const handleUpdateUser = (data) =>{
        api.changeProfile(data)
            .then(data =>{
                setCurrentUser(data);
            })
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
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentCardContext.Provider value={[currentCard, setCurrentCard]}>
                <Main 
                    onEditProfile ={handleEditProfileClick}
                    onAddPlace ={handleAddPlaceClick}
                    onEditAvatar ={handleEditAvatarClick}
                    onCloseAllPopups = {closeAllPopups}
                    onHandleCardClick = {handleCardClick}
                    onHandleCardLike = {handleCardLike}
                    onHandleCardDelete = {handleCardDelete}
                    isSelectedCardForm = {isSelectedCard}
                    cards={currentCard}
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
                {/* <section className="elements">
                {currentCard.map((item, i)=>
                    <Card
                        key = {i}
                        onCardClick = {props.onHandleCardClick}
                        card = {item}
                        onCardLike={handleCardLike}
                    />
                )}
                </section> */}
            </CurrentCardContext.Provider>
        </CurrentUserContext.Provider>
        <Footer />

        
    </div>
  );
}

export default App;