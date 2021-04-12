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
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext';
import CurrentCardContext from '../contexts/CurrentCardContext';
import * as Auth from './Auth';


function App() {
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: ''
      })
    const [infoTooltipImage, setInfoTooltipImage] = useState("");
    const [infoTooltipText, setInfoTooltipText] = useState("");

    useEffect(() => {
      tokenCheck()
    }, [])

    const handleLogin = ({ password, email  }) => {
      return Auth.authorize(password, email)
        .then((data) => {
          if (!data) throw new Error('Неверные имя пользователя или пароль')
          if (data.token) {
            setLoggedIn(true)
            localStorage.setItem('token', data.token)
            infoTooltipPopup();
            history.push('/main')
            return;
          }
        })
        .catch(() => 
            infoTooltipPopup()
          )
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
        Auth.getContent(token).then(({data}) => {
          if (data._id) {
            setLoggedIn(true)
            setUserData(data)
            console.log(userData)
          }
      })
    }
  }
    useEffect(()=>{
      api.getInformation()
      .then(data => {
          setCurrentUser(data);
          // console.log(data)
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

    const handleUpdateUser = (data) =>{
        api.changeProfile(data)
            .then(data =>{
                setCurrentUser(data);
            })
            .catch((err)=>{console.log(err)})
    }

    const isInfoTooltipPopupOpen = () =>{
      setIsOpenInfoTooltip(true);
    }

    const closeInfoTooltipPopup = () => {
        setIsOpenInfoTooltip(false);
    }

    const signOut = () =>{
      localStorage.removeItem('token');
      history.push('/singin');
      setLoggedIn(false);
    }

    const  infoTooltipPopup = () => {
      isInfoTooltipPopupOpen();
      console.log(localStorage.token !== undefined)
      if (localStorage.token){
        setInfoTooltipImage(`url(../images/Union.png)`);
        setInfoTooltipText('Вы успешно зарегистрировались!');
      } else {
        setInfoTooltipImage('../images/NotUnion.png');
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      }
        console.log(infoTooltipImage)

    }

  return (
    <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentCardContext.Provider value={[currentCards, setCurrentCards]}>
                <Switch>
                    <ProtectedRoute path="/main" 
                        loggedIn={loggedIn} 
                        signOut={signOut}
                        component={Main}
                        onHandleCardLike = {handleCardLike}
                        onHandleCardDelete = {handleCardDelete}
                        cards={currentCards}
                        user={userData} 
                        handleUpdateUser={handleUpdateUser}
                        handleUpdateAvatar={handleUpdateAvatar}
                        handleUpdateCard={handleUpdateCard}
                        infoTooltipImage={infoTooltipImage}
                        infoTooltipText={infoTooltipText}
                        isOpenInfoTooltip={isOpenInfoTooltip}
                        closeInfoTooltipPopup={closeInfoTooltipPopup}                        
                    />
                    <Route exact path='/signin'>
                        <Login 
                          onLogin={handleLogin}
                          infoTooltipImage={infoTooltipImage}
                          infoTooltipText={infoTooltipText}
                          isOpenInfoTooltip={isOpenInfoTooltip}
                          closeInfoTooltipPopup={closeInfoTooltipPopup}                        
                        />
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