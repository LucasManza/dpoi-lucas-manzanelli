import {UserService} from "../../shared/services/user.service.js";
import {UserModel} from "../../shared/models/user.model.js";

//INTERNAL FUNCTIONS
const icon = (fasItem) => {
    const icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add(fasItem);
    return icon;
};

const renderUserRow = (simpleUserModel) => {
    const tbody = document.getElementById('usersTable')
        .getElementsByTagName('tbody')[0];

    const row = tbody.insertRow();
    row.insertCell().appendChild(document.createTextNode(simpleUserModel.firstName));
    row.insertCell().appendChild(document.createTextNode(simpleUserModel.lastName));
    row.insertCell().appendChild(document.createTextNode(simpleUserModel.mail));
    row.insertCell().appendChild(document.createTextNode(simpleUserModel.phone));

    row.insertCell().appendChild(icon('fa-calendar-alt'));
    row.insertCell().appendChild(icon('fa-edit'));
    row.insertCell().appendChild(icon('fa-trash'));

};

const renderUsersLoading = () => {
    const section = document.getElementById('users');

    const loader = document.createElement('div');
    loader.className = 'loader';

    const loadContainer = document.createElement('div');
    loadContainer.className = 'loader-container';
    loadContainer.append(loader);

    section.insertAdjacentElement('beforeend', loadContainer);
};

const renderNoneUsers = () => {
    const section = document.getElementById('users');

    const div = document.createElement('div');
    div.className = 'loader-container';

    const span = document.createElement('span');
    span.appendChild(document.createTextNode('None Users found!'));

    div.appendChild(span);

    section.insertAdjacentElement('beforeend', div);
};

const destroyElement = (elementClass) => {
    const element = document.querySelector(elementClass);
    if (element) element.parentNode.removeChild(element);
};

//EXECUTION
renderUsersLoading();

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

userService.requestUsers().then(users => {
    if (users.length === 0)
        renderNoneUsers();
    else {
        users.forEach(u => renderUserRow(u));
        destroyElement('loader-container');
    }
    destroyElement('.loader-container');
});

