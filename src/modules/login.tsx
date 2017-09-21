import * as React from "react";

export class LoginView extends React.Component<{}, any> {
    render() {
        // TODO: post form, read session
        return (
            <form name="login-form" action="user/login" method="post">
                <div className="form-group">
                    <label htmlFor="loginEmail">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="loginName"
                        name="name"
                        placeholder="Enter username"
                        required
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="loginPassword"
                        placeholder="Enter pssword"
                        required
                    />
                    <button type="button" className="btn btn-primary" onClick={this.onClick}>
                        Login
          </button>
                </div>
            </form>
        );
    }

    onClick = (e) => {
        e.preventDefault();
        document.forms["login-form"].submit();
    }
}
