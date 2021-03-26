import {useState, useEffect, useContext} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCard({
            name,
            link
        });
        props.onClose();
      } 

    const handleChangeInputName = (event) =>{
        setName(event.target.value);
    }

    const handleChangeInputLink = (event) =>{
        setLink(event.target.value);
    }

    return(
        <PopupWithForm 
            name="add"
            onClose = {props.onClose}
            isOpen={props.isOpen}
            submitForm={handleSubmit}
            children= {
                <>
                    <h2 className="popup__text popup__text_type_form">Новое место</h2>
                    <div className="popup__input-area">
                        <input required minLength="2" maxLength="30" value={name} onChange={handleChangeInputName} type="text" className="popup__input popup__input_value_name-image" name="nameCard" id="nameCard" placeholder="Название"/>
                        <span id="nameCard-error" className="popup__error"></span>
                    </div>
                    <div className="popup__input-area">
                        <input required value={link} onChange={handleChangeInputLink} type="url" className="popup__input popup__input_value_url" name="imgCard" id="imgCard" placeholder="Ссылка на картинку"/>
                        <span id="imgCard-error" className="popup__error"></span>
                    </div>
                    <button className="popup__btn-save" value="" type="submit" id="addButton">
                        Создать
                    </button>
                </>
            }
        />
    )
}
export default AddPlacePopup;