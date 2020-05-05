export class UserModel {
    constructor(
        firstName, lastName, mail, phone,
        street, province, postalCode,
        birthDate, single, description,
        id = undefined) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.street = street;
        this.province = province;
        this.postalCode = postalCode;
        this.birthDate = birthDate;
        this.single = single;
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