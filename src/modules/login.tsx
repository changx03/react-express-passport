import * as React from "react";
import userController from "./user-controller";
import { observer } from "mobx-react";
// import { FlashMessages } from "./alert";
import Input from "./components/input";

@observer
export class LoginView extends React.Component<any, any> {
    render() {
        const { user, msg, status } = userController,
            msgClass = (status === 2) ? "info" : "danger";

        // TODO: post form, read session
        return (
            <div>
                {
                    !!msg && <div className={`alert alert-${msgClass}`} role="alert">{msg}</div>
                }
                {/* this.props.messages && <FlashMessages /> */}
                <form name="login-form" action="user/login" method="post">
                    <div className="form-group">
                        <label htmlFor="loginEmail">Username</label>
                        <Input
                            controller={userController}
                            editItem="user"
                            keyField="username"
                            placeHolder="Enter your username"
                            type="text"
                            id="username"
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
                        <button type="button" className="btn btn-primary" onClick={this.onClick}>Login</button>
                    </div>
                </form>
            </div>
        );
    }

    onClick = (e) => {
        e.preventDefault();
        // document.forms["login-form"].submit();
        userController.login((status, data) => {
            console.log(status, data);
        });
    }
}
