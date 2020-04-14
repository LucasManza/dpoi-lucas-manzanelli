export class SimpleUserModel {
    constructor(firstName, lastName, mail, phone, id = undefined) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
    }

}