import {UserService} from "../../shared/services/user.service.js";
import {emptyUser, UserModel} from "../../shared/models/user.model.js";


class Users {
    userService = new UserService();
    userModel = emptyUser();

    constructor() {
        this.getAllUsers();
        this.subscribeForm();
        this.subscribeCancel();
    }

    //Renderer DOM Methods

    icon(fasItem) {
        const icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add(fasItem);
        return icon;
    };

    renderUserRow(userModel) {
        const tbody = document.getElementById('usersTable')
            .getElementsByTagName('tbody')[0];

        const row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(userModel.firstName));
        row.insertCell().appendChild(document.createTextNode(userModel.lastName));
        row.insertCell().appendChild(document.createTextNode(userModel.mail));
        row.insertCell().appendChild(document.createTextNode(userModel.phone));

        row.insertCell().appendChild(this.icon('fa-calendar-alt'));
        row.insertCell().appendChild(this.icon('fa-edit')).addEventListener('click',()=>{
            this.editUser()
        });
        row.insertCell().appendChild(this.icon('fa-trash'))
            .addEventListener("click", () => {
                this.deleteUser(userModel.id)
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

    //Main methods

    subscribeForm() {
        document.getElementById('submitUser').addEventListener('click', event => {
            event.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const mail = document.getElementById("mail").value;
            const phone = document.getElementById("phone").value;
            const street = document.getElementById("street").value;
            const province = document.getElementById("provinces").value;
            const postalCode = document.getElementById("postalCode").value;
            const birth = document.getElementById("birth").value;
            const single = document.getElementById("single").checked;
            const description = document.getElementById("description").value;
            this.userModel = new UserModel(firstName, lastName, mail, phone, street, province, postalCode, birth, single, description, this.userModel.id);
            console.log("User model", this.userModel)
            this.postUser(this.userModel)
        })
    }

    subscribeCancel() {
        document.getElementById('cancel').addEventListener('click', event => {
            event.preventDefault();
            document.getElementById('userForm').reset();
            this.userModel = emptyUser();
        })
    }

    editUser(userModel) {
        this.userModel = userModel;
        document.getElementById("firstName").value = this.userModel.firstName;
        document.getElementById("lastName").value = this.userModel.lastName;
        document.getElementById("mail").value = this.userModel.mail;
        document.getElementById("phone").value = this.userModel.phone;
        document.getElementById("street").value = this.userModel.street;
        document.getElementById("provinces").value = this.userModel.province;
        document.getElementById("postalCode").value = this.userModel.postalCode;
        document.getElementById("birth").value = this.userModel.birthDate;
        if (this.userModel.single)
            document.getElementById("single").checked = true;
        else
            document.getElementById("married").checked = true;

        document.getElementById("description").value = this.userModel.description;

    }

    getAllUsers() {
        this.renderLoading();

        var table = document.getElementById("usersTable");

        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }

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

    postUser(userModel) {
        this.userService.postUser(userModel)
            .then(() => this.getAllUsers())
    }

}

new Users();

