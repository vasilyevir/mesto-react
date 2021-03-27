import {useState, useEffect, useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function EditAvatarPopup(props) {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(
          inputRef.current.value
        );
        props.onClose();
      } 
    return(
        <PopupWithForm
            name="avatar"
            onClose = {props.onClose}
            isOpen={props.isOpen}
            submitForm={handleSubmit}
            title="Обновить аватар"
            >
                <>
                    <div className="popup__input-area">
                        <input required type="url" className="popup__input popup__input_value_url" name="imgAvatar" id="imgAvatar" placeholder="Ссылка на аватарку" ref={inputRef}/>
                        <span id="imgAvatar-error" className="popup__error"></span>
                    </div>
                    <button className="popup__btn-save" type="submit">
                        Сохранить
                    </button>
                </>
            </PopupWithForm>
    )
}
export default EditAvatarPopup;
