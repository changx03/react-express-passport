import { observable } from "mobx";

export class UserController {
    @observable user: User;
    @observable errMsg: string;

    constructor() {
        this.user = new User("luke", "luke@csel.co.nz", "PassPass1", "PassPass1");
    }

    validation = () => {
        if(!(this.user.password.length >= 6 && this.user.password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/g))) {
            this.errMsg = "Pasword must at least 6 characters long and contains number and upper case"
        }
        else if(this.user.password != this.user.password2) { this.errMsg = "Passwords do not match"; }
        else { this.errMsg = null; }
    }

    registerUser = async () => {
        if(!this.errMsg) {
            try {
                let promise = await fetch("/user/register", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.user)
                });
                let response = promise.json();
                console.log(response);
            } catch(err) {
                throw err;
            }
        }
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

