import {useState, useEffect, useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function InfoTooltip(props) {
     console.log(props);
    return(
        <PopupWithForm
            name="InfoTooltip"
            onClose = {props.onClose}
            isOpen={props.isOpenInfoTooltip}
            >
                <>
                    <div 
                        className={localStorage.token ? `info-tooltip__image info-tooltip__image_right`: `info-tooltip__image info-tooltip__image_wrong`}>
                    </div>
                    <h2 className="popup__text popup__text_type_form">{props.text}</h2>
                </>
            </PopupWithForm>
    )
}
export default InfoTooltip;
