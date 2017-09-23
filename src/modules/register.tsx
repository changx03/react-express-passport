import * as React from "react";
import * as Express from "express";
import userController from "./user-controller";
import { observer } from "mobx-react";

@observer
export class RegisterView extends React.Component<{}, any> {
    render() {
        const { user, errMsg } = userController;

        return (
            <div>
                {
                    errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>
                }
                <form name="register-form" action="user/register" method="post">
                    <label htmlFor="loginName">User name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="loginName"
                        name="name"
                        value={user.username}
                        required
                    />
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                        value={user.email}
                        required
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        required
                    />
                    <label htmlFor="loginPasswordConfirm">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPasswordConfirm"
                        placeholder="Password"
                        name="password2"
                        value={user.password2}
                        required
                    />
                    <button type="button" className="btn btn-primary" onClick={this.onClick}>
                        Join
                    </button>
                </form>
            </div>
        );
    }

    validatForm = (): boolean => {
        if (document.forms["register-form"]["password"].value !== document.forms["register-form"]["password2"].value) {
            console.log("Passwords must match!");
            return false;
        } else { return true; }
    }

    onClick = (e) => {
        userController.validation();
        userController.registerUser();

        // e.preventDefault();
        // let validation = this.validatForm();
        // if(validation) {
        //     document.forms["register-form"].submit();
        // }
    }
}
