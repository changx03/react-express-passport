import { observable } from "mobx";

export class UserController {
    @observable user: User;
    @observable msg: string = "";
    @observable status: number = 4;

    constructor() {
        this.user = new User("", "", "", "");
    }

    validation = () => {
        if(!(this.user.email && this.user.email.match(/[A-Za-z0-9.-_]+@[A-Za-z0-9_-]+\.[A-Za-z.]{2,6}$/g))) {
            this.msg = "Invalid email format.";
        }
        else if(!(this.user.password && this.user.password.length >= 6 && this.user.password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z])/g))) {
            this.msg = "Pasword must at least 6 characters long and contains number and upper case"
        }
        else if(this.user.password !== this.user.password2) { this.msg = "Passwords do not match"; }
        else { this.msg = ""; }
    }

    registerUser = (callback): Promise<any> => {
        if(!this.msg) {
            fetch("/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.user)
            }).then(response => {
                response.json().then(data => {
                    this.msg = data.msg;
                    this.status = Math.round(response.status / 100);
                    callback(response.status, data);
                })
            });
        } else { return Promise.reject(new Error("Fail to post")); }
    }
}

export class User {
    @observable username: string;
    @observable email: string;
    @observable password: string;
    @observable password2: string;

    constructor(username?: string, email?: string, password?: string, password2?: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.password2 = password2;
    }
}

export default new UserController();

