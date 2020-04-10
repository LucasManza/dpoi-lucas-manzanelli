import {UserService} from "../../shared/services/user.service.js";

//INTERNAL FUNCTIONS
const icon = (fasItem) => {
    const icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add(fasItem);
    return icon;
};

const renderUserRow = (userModel) => {
    const tbody = document.getElementById('usersTable')
        .getElementsByTagName('tbody')[0];

    const row = tbody.insertRow();
    row.insertCell().appendChild(document.createTextNode(userModel.firstName));
    row.insertCell().appendChild(document.createTextNode(userModel.lastName));
    row.insertCell().appendChild(document.createTextNode(userModel.mail));
    row.insertCell().appendChild(document.createTextNode(userModel.phone));

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

userService.requestUsers().then(users => {
    if (users.length === 0)
        renderNoneUsers();
    else {
        users.forEach(u => renderUserRow(u));
        destroyElement('loader-container');
    }
    destroyElement('.loader-container');
});
