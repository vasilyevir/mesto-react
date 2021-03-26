import {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';


const Card = (props) => {
    const currentUser = useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card);
      }  
    
    function handleLikeClick(){
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card._id);
    }
    
    const isOwn = props.card.owner._id === currentUser._id;


    const cardDeleteButtonClassName = (
        `element__btn-delete ${isOwn && 'element__btn-delete_my-card'}`
      ); 

   
    
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `${isLiked ? 'element__heart element__heart_active' : 'element__heart'}`;

    return(
        <div className="element">
            <img 
                alt={props.card.name} 
                src={props.card.link} 
                className="element__image"
                onClick={handleClick}    
            />
            <button 
                className={cardDeleteButtonClassName} 
                type="button"
                onClick={handleCardDelete}
            ></button>
            <div className="element__footer">
            <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like-group">
                {/* onClick={props.onCardLike(props.card)} */}
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
)
}

export default Card;