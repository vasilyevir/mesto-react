import Header from './Header';
import Footer from './Footer';
import {useState, useEffect, useHistory} from 'react';
import {Link} from 'react-router-dom';


const Registr = ({onRegister}) => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [message, setMessage] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        let { password, email } = userData;
        e.preventDefault();
        console.log({ password, email })
        onRegister({ password, email }).catch(
            err => setMessage(err.message || 'Что-то пошло не так')
        )
    }  

    return(
        <>
            <Header>
                <>
                    <Link className="login__link login__link_header" to="/signin">Войти</Link>
                </>
            </Header>
            <div className="login">
                <h1 className="login__header">Регистрация</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <input id="email" name="email" className="login__input" type="email" value={userData.email} placeholder="Email" onChange={handleChange}/>
                    <input id="password" name="password" className="login__input" type="password" value={userData.password} placeholder="Пароль" onChange={handleChange}/>
                    <button className="login__button">Зарегестрироваться</button>
                </form>
                <p className="login__registr">Уже зарегистрированы? <Link className="login__link" to="/signin">Войти</Link> </p>
            </div>
            <Footer/>
        </>
    )
    
}

export default Registr;