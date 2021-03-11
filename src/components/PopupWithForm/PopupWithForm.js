function PopupWithForm (props){
    return(
        // ${props.isOpen && 'popup_is-opened'}
        <section className={`popup popup_${props.name} ${props.isOpen && 'popup_is-opened'}`}>
            <div className="popup__window popup__window_type_form"> 
                <button
                    onClick={props.onClose} 
                    className={`popup__btn-close popup__btn-close_${props.name}`} 
                    type="button"
                ></button>
                <form className={`popup__list popup__list_${props.name}`} name="formEdit">
                    {props.children}
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;