import logo from '../logo.svg';
import Header from './Header'
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory, Link} from 'react-router-dom';
import {useRoutes} from 'hookrouter';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext';
import CurrentCardContext from '../contexts/CurrentCardContext';
import * as Auth from './Auth';


function App() {
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);
    const [isSelectedCard, setIsSelectedCard] = useState({name: '', link: ''})
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: ''
      })

    // const routes = {
    //   "/main": () => (<>
    //                       <p className="">email</p>
    //                       <Link className="login__link" to="/signin">Выйти</Link>
    //                   </>),
    //   "/signup": () => ( <Link className="login__link login__link_header" to="/signin">Войти</Link> ),
    //   "/signin": () => (<Link className="login__link" to="/signup">Регистрация</Link>)
    // };

    useEffect(() => {
      tokenCheck()
    }, [])

    const handleLogin = ({ password, email  }) => {
      return Auth.authorize(password, email)
        .then((data) => {
          console.log(data)
          if (!data) throw new Error('Неверные имя пользователя или пароль')
          if (data.token) {
            // console.log(1)
            setLoggedIn(true)
            localStorage.setItem('token', data.token)
            // console.log(localStorage)
            history.push('/main')
            // tokenCheck()
            // console.log(loggedIn)
            return;
          }
          console.log(data.jwt)
        })
    }

    useEffect(() => {
      if (loggedIn) {
        history.push("/main");
      }
    }, [loggedIn])

    const handleRegister = ({ password, email }) => {
      // console.log({password, email })
      return Auth.register({ password, email }).then((res) => {
        if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
        return res;
      }).catch()
    }
    const history = useHistory();

    useEffect(() => {
      tokenCheck()
    }, [])

    const tokenCheck = () => {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        console.log(token)
        Auth.getContent(token).then(({data}) => {
          console.log(data)
          console.log(data.email)
          if (data._id) {
            setLoggedIn(true)
            setUserData(data._id, data.email)
            console.log(userData)
          }
      })
    }
  }
    useEffect(()=>{
      api.getInformation()
      .then(data => {
          setCurrentUser(data);
          console.log(data)
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
    
      useEffect(() => {
        tokenCheck()
      }, [])
    
      useEffect(() => {
        if (loggedIn) {
          history.push("/main");
        }
      }, [loggedIn])



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
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.postLike(card._id, !isLiked).then((newCard) => {
            setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err)=>{console.log(err)}) 
    }

    const handleCardDelete = (cardId) =>{
        const cards = currentCards.filter(card => card._id !== cardId);

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

    // const routesResult = useRoutes(routes);

  return (
    <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentCardContext.Provider value={[currentCards, setCurrentCards]}>
                {/* <Header>{routesResult}</Header> */}
                <Switch>
                    {/* <ProtectedRoute path='/' loggedIn={loggedIn} component={Main}/> */}
                    {/* <MainPage/> */}
                    {/* loggedIn={loggedIn} */}
                    <ProtectedRoute path="/main" 
                        loggedIn={loggedIn} 
                        component={Main}
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
                    <Route exact path='/signin'>
                        <Login onLogin={handleLogin}/>
                    </Route>
                    <Route path='/signup'>
                        <Register onRegister={handleRegister}/>
                    </Route>
                     <Route>
                        {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
                    </Route>
                </Switch>
                <Footer/>
            </CurrentCardContext.Provider>
        </CurrentUserContext.Provider>        
    </div>
  );
}

export default App;