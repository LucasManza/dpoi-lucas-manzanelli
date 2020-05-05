import {UserModel} from "../models/user.model.js";

const url = 'http://dpoi2012api.appspot.com/api/1.0';

const parseJSON = json => {
    console.log('JSON RESPONSE', json);
    return new UserModel(
        json.firstName,
        json.lastName,
        json.mail,
        json.phone,
        json.street,
        json.province,
        json.postalCode,
        json.birthDate,
        json.single,
        json.description,
        json.id
    );
};

class UserService {
    constructor() {
    }

    async requestUsers() {
        return new Promise((resolve, reject) => {
            fetch(url + '/list?credential=lmanzanelli').then(response => {
                if (response.ok)
                    resolve(response.json()
                        .then(data =>
                            data.payload.items.map(parseJSON)
                        ));
                else reject(response.error())
            })
        });
    }

    async postUser(userModel) {
        //todo FormData doesnt work for some reason
        // reference -> https://desarrolloweb.com/articulos/fetch-post-ajax-javascript.html
        const data = new URLSearchParams();

        //Objects entries return an array of string tuples as (key,value)
        Object.entries(userModel)
            .forEach(([key, value]) => {
                data.append(key, '' + value);
            });

        return new Promise((resolve, reject) => {
            fetch(url + '/create?credential=lmanzanelli',
                {
                    method: 'POST',
                    body: JSON.stringify(Object.entries(userModel)),
                }
            )
                .then(response => {
                    if (response.ok) {
                        resolve(userModel);
                    } else reject(response.error())
                })
        });
    }

    async deleteUser(userId) {
        const data = new URLSearchParams();
        data.append('id', userId);

        new Promise((resolve, reject) => {
            fetch(url + '/delete?credential=lmanzanelli',
                {
                    method: 'POST',
                    body: data,
                }
            )
                .then(response => {
                    if (response.ok) {
                        resolve(response.json().then(data => data));
                    } else reject(response.error())
                })
        });

    }
}

export {UserService}


