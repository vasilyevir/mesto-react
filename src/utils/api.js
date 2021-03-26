class Api{
    constructor(data){
        this._groupId = data.groupId;
        this._address = data.address;
        this._token = data.token;
    }
    
    getInformation(){
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getCards(){
        return fetch(`${this._address}/cards`,{
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeProfile(obj){
        return fetch(`${this._address}/users/me`,{
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                about: obj.about
              })
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    postCard(obj){
        return fetch(`${this._address}/cards`,{
            method: 'POST',
            headers: {
                authorization : this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
              }) 
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(cardId){
        return fetch(`${this._address}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    postLike(cardId, isLiked){
        if (isLiked) {
            // console.log(cardId);
            return fetch(`${this._address}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization : this._token,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok){
                    return res.json();
                }

            return Promise.reject(`Ошибка: ${res.status}`);
            })
        } else {
            // console.log(cardId);
            return fetch(`${this._address}/cards/likes/${cardId}`,{
                method: 'DELETE',
                headers: {
                    authorization : this._token
                }
            })
            .then((res) => {
                if (res.ok){
                    return res.json();
                }
    
            return Promise.reject(`Ошибка: ${res.status}`);
            })
        }
    }
    
    changeAvatar(link){
        return fetch(`${this._address}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization : this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
              }) 
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

const config = {
    groupId: 'cohort-19',
    address: `https://mesto.nomoreparties.co/v1/cohort-19`,
    token: 'ff772675-543c-463e-9612-0881eae5b0a5'
}

const api = new Api(config);
// console.log(config);
// console.log(api);

export default api;
