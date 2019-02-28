export class User {
    email: string;
    password: string;
    name: string;

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
