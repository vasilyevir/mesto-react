import {useState, useEffect, useContext} from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    useEffect(()=>{
        setName(currentUser.name || '');
        setAbout(currentUser.about || '');
    },[currentUser])

    const handleChangeInputName = (event) =>{
        setName(event.target.value);
    }

    const handleChangeInputAbout = (event) =>{
        setAbout(event.target.value);
    }

    const handleSubmit = (e) =>{
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

  // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about,
        });
        
        props.onClose();
    }

    return(
    <PopupWithForm 
    isOpen= {props.isOpen}
    onClose = {props.onClose}
    name="edit"
    submitForm={handleSubmit}
    title="Редактировать профиль"
    >
        <>
            <div className="popup__input-area">    
                <input required minLength="2" value={name} maxLength="40" onChange={handleChangeInputName} type="text" className="popup__input popup__input_value_name" id="name" name="name" placeholder="Имя"/>
                <span id="name-error" className="popup__error"></span>
            </div>
            <div className="popup__input-area">
                <input required minLength="2" value={about} maxLength="200" onChange={handleChangeInputAbout} type="text" className="popup__input popup__input_value_job" id="about" name="about" placeholder="О себе"/>
                <span id="about-error" className="popup__error"></span>
            </div>
            <button className="popup__btn-save" value="Сохранить" type="submit" name="closeEdit">
                Сохранить
            </button>
        </>
    </PopupWithForm>
    )
}
export default EditProfilePopup;
