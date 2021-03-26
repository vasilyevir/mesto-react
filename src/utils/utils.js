const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupCard = '.popup_card';
const popupText = '.popup__text_type_image';
const popupImage = '.popup__image';
const elementText = '.element__text';
const elementImage = '.element__image';
const formAdd = '.popup_add';
const formEdit = '.popup_edit';
const formDelete ='.popup_confidence';
const name = '.profile__name';
const nameChange = document.querySelector('.popup__input_value_name');
const nameImage = document.querySelector('.popup__input_value_name-image');
const job = '.profile__job';
const urlImage = document.querySelector('.popup__input_value_url')
const jobChange = document.querySelector('.popup__input_value_job');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const addBtn = '.profile__btn-add'
const elements = '.elements';
const template = '#elements';
const btnDelete = '.element__btn-delete';
const btnDeleteMyCard = 'element__btn-delete_my-card';
const like = '.element__heart';
const likeActive = 'element__heart_active';
const numberOfLikes = ".element__like-number";
const formAvatar = '.popup_avatar';
const avatarButton = document.querySelector('.profile__image-avatar-effects');
const btnSave = '.popup__btn-save';

const validationConfigProfile = {};
validationConfigProfile.inputList = Array.from(document.querySelector(formEdit).querySelectorAll('.popup__input')),
validationConfigProfile.submitButton = document.querySelector(formEdit).querySelector('.popup__btn-save'),
validationConfigProfile.inactiveButtonClass = 'popup__btn-save_invalid';
validationConfigProfile.inputErrorClass = 'popup__input_state_invalid';

const validationConfigAvatar = {};
validationConfigAvatar.inputList = Array.from(document.querySelector(formAvatar).querySelectorAll('.popup__input')),
validationConfigAvatar.submitButton = document.querySelector(formAvatar).querySelector('.popup__btn-save'),
validationConfigAvatar.inactiveButtonClass = 'popup__btn-save_invalid';
validationConfigAvatar.inputErrorClass = 'popup__input_state_invalid';

const validationConfigCard = {};
validationConfigCard.inputList = Array.from(document.querySelector(formAdd).querySelectorAll('.popup__input')),
validationConfigCard.submitButton = document.querySelector(formAdd).querySelector('.popup__btn-save'),
validationConfigCard.inactiveButtonClass = 'popup__btn-save_invalid';
validationConfigCard.inputErrorClass = 'popup__input_state_invalid';

const obj = {};
obj.name = '.profile__name';
obj.about = '.profile__job';
obj.avatarImage = '.profile__image-avatar'

const configImage = {};
configImage.popupText = popupText;
configImage.popupImage = popupImage;
configImage.elementText = elementText;
configImage.elementImage = elementImage;

const groupId = 'cohort-19';
const address = `https://mesto.nomoreparties.co/v1/${groupId}`;
const token = 'ff772675-543c-463e-9612-0881eae5b0a5';


export {initialCards, formAdd, formEdit, name, nameChange, nameImage, job, urlImage, jobChange,
    editButton, addButton, addBtn, elements, template, popupCard, validationConfigProfile,
    validationConfigCard, obj, configImage, address, token, groupId, formDelete, btnDelete, 
    btnDeleteMyCard, likeActive, like, numberOfLikes, formAvatar, validationConfigAvatar,
    avatarButton, btnSave}