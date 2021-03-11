const Card = (props) => {

    function handleClick() {
        props.onCardClick(props.card);
      }  

    return(
        <div className="element">
            <img 
                alt={props.card.name} 
                src={props.card.link} 
                className="element__image"
                onClick={handleClick}    
            />
            <button className="element__btn-delete element__btn-delete_my-card" type="button"></button>
            <div className="element__footer">
            <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like-group">
                    <button className="element__heart" type="button"></button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
)
}

export default Card;