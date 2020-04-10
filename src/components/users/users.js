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

const renderUserLoading = () => {
    const section = document.getElementById('users');

    const loader = document.createElement('div');
    loader.className = 'loader';

    const loadContainer = document.createElement('div');
    loadContainer.className = 'loader-container';
    loadContainer.append(loader);

    section.insertAdjacentElement('beforeend', loadContainer);
};

const destroyUserLoading = () => {
    const loader = document.querySelector('.loader-container');
    loader.parentNode.removeChild(loader);
};

//EXECUTION
renderUserLoading();

const userService = new UserService();

userService.requestUsers().then(users => {
    users.forEach(u => renderUserRow(u));
    destroyUserLoading();
});
