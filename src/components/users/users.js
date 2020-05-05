import {UserService} from "../../shared/services/user.service.js";


class Users {
    userService = new UserService();

    constructor() {
        this.getAllUsers();
    }

    //Renderer DOM Methods

    icon(fasItem) {
        const icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add(fasItem);
        return icon;
    };

    renderUserRow(simpleUserModel) {
        const tbody = document.getElementById('usersTable')
            .getElementsByTagName('tbody')[0];

        const row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(simpleUserModel.firstName));
        row.insertCell().appendChild(document.createTextNode(simpleUserModel.lastName));
        row.insertCell().appendChild(document.createTextNode(simpleUserModel.mail));
        row.insertCell().appendChild(document.createTextNode(simpleUserModel.phone));

        row.insertCell().appendChild(this.icon('fa-calendar-alt'));
        row.insertCell().appendChild(this.icon('fa-edit'));
        row.insertCell().appendChild(this.icon('fa-trash'))
            .addEventListener("click", () => {
                this.deleteUser(simpleUserModel)
            });
    };

    renderLoading() {
        const section = document.getElementById('users');

        const loader = document.createElement('div');
        loader.className = 'loader';

        const loadContainer = document.createElement('div');
        loadContainer.className = 'loader-container';
        loadContainer.append(loader);

        section.insertAdjacentElement('beforeend', loadContainer);
    };

    renderNoneUsers() {
        const section = document.getElementById('users');

        const div = document.createElement('div');
        div.className = 'loader-container';

        const span = document.createElement('span');
        span.appendChild(document.createTextNode('None Users found!'));

        div.appendChild(span);

        section.insertAdjacentElement('beforeend', div);
    };

    destroyElement(elementClass) {
        const element = document.querySelector(elementClass);
        if (element) element.parentNode.removeChild(element);
    };

    //Internal methods

    getAllUsers() {
        this.renderLoading();
        this.userService.requestUsers().then(users => {
            if (users.length === 0)
                this.renderNoneUsers();
            else {
                users.forEach(u => this.renderUserRow(u));
                this.destroyElement('loader-container');
            }
            this.destroyElement('.loader-container');
        });
    }

    deleteUser(id) {
        this.userService.deleteUser(id)
            .then(() => this.getAllUsers())
    }

    submitUser(userModel) {
        this.userService.postUser(userModel)
            .then(() => this.getAllUsers())
    }

}

new Users();

const userService = new UserService();
// userService.postUser(new UserModel(
//     'Lucas',
//     'Manzanelli',
//     'l@l',
//     '1133151180',
//     '1',
//     'Buenos Aires',
//     '1666',
//     '14/07/1995',
//     'Single',
//     'des',
// ))
//     .then(res => console.log(res))


