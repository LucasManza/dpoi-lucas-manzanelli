import {SimpleUserModel} from "../models/simple-user.model.js";

const url = 'http://dpoi2012api.appspot.com/api/1.0';

const parseUser = json => {
    return new SimpleUserModel(
        json.firstName,
        json.lastName,
        json.mail,
        json.phone,
        json.mail
    );
};

class UserService {
    constructor() {
    }

    async requestUsers() {
        return new Promise((resolve, reject) => {
            fetch(url + '/list_delay?credential=lmanzanelli').then(response => {
                if (response.ok)
                    resolve(response.json()
                        .then(data => data.payload.items.map(parseUser)));
                else reject(response.error())
            })
        });
    }

    async postUser(userModel) {
        return new Promise((resolve, reject) => {
            fetch(url + '/create?credential=lmanzanelli'
                + JSON.stringify(userModel))
                .then(response => {
                    if (response.ok)
                        resolve(response.json());
                    else reject(response.error())
                })
        });
    }
}

export {UserService}


