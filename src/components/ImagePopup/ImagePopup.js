function ImagePopup(props){
    // console.log(props);
    return(
        <section className={`popup popup_card ${(props.card !== '') && 'popup_is-opened'}`}>
            <div className="popup__window popup__window_type_image">
                <button className="popup__btn-close popup__btn-close_card" 
                type="button"
                onClick={props.onClose}
                ></button>
                <div className="popup__element">
                    <img 
                        src={`${props.card.link}`}
                        // `url(${props.card.link})` 
                        alt={props.card.name} 
                        className="popup__image"/>
                    <p className="popup__text popup__text_type_image">{props.card.name}</p>
                </div>
            </div>
        </section> 
    )
}

export default ImagePopup;