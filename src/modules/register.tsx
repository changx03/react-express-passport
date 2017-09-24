import * as React from "react";
import * as Express from "express";
import userController from "./user-controller";
import { observer } from "mobx-react";
import Input from "./components/input";

@observer
export class RegisterView extends React.Component<{}, any> {
    render() {
        const { user, msg, status } = userController,
            msgClass = (status === 2) ? "info" : "danger";

        return (
            <div>
                {
                    !!msg && <div className={`alert alert-${msgClass}`} role="alert">{msg}</div>
                }
                <form name="register-form" action="user/register" method="post">
                    <label htmlFor="loginName">User name</label>
                    <Input
                        controller={userController}
                        editItem="user"
                        keyField="username"
                        placeHolder="Enter your username"
                        type="text"
                        id="username"
                        required={true}
                    />
                    <label htmlFor="loginEmail">Email</label>
                    <Input
                        controller={userController}
                        editItem="user"
                        keyField="email"
                        type="email"
                        id="loginEmail"
                        placeHolder="Enter your email"
                        required={true}
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <Input
                        controller={userController}
                        editItem="user"
                        keyField="password"
                        type="password"
                        id="loginPassword"
                        placeHolder="Enter your email"
                        required={true}
                    />
                    <label htmlFor="loginPasswordConfirm">Confirm password</label>
                    <Input
                        controller={userController}
                        editItem="user"
                        keyField="password2"
                        type="password"
                        id="loginPasswordConfirm"
                        placeHolder="Confirm your password"
                        required={true}
                    />
                    <button type="button" className="btn btn-primary" onClick={this.onClick}>
                        Join
                    </button>
                </form>
            </div>
        );
    }

    onClick = (e) => {
        userController.validation();
        userController.registerUser((status, data) => {
            // TODO: pause 200ms then redirect! 
            console.log(status, data);
        });
    }
}

