export class UserModel {
    constructor(
        firstName, lastName, mail, phone,
        street, province, postalCode,
        birthDate, martialStatus, description,
        id = undefined) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.street = street;
        this.province = street;
        this.postalCode = postalCode;
        this.birthDate = birthDate;
        this.martialStatus = martialStatus;
        this.description = description;
    }

}

export const emptyUser = () => {
    return new UserModel(
        undefined, undefined,
        undefined, undefined,
        undefined, undefined,
        undefined, undefined,
        undefined, undefined,)
}