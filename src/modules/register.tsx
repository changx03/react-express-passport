import * as React from "react";
import * as Express from "express";

export class RegisterView extends React.Component<{}, any> {
    render() {
        return (
            <form name="register-form" action="user/register" method="post">
                <div className="form-group">
                    <label htmlFor="loginName">User name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="loginName"
                        name="name"
                        defaultValue="Test Name"
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
                        defaultValue="test@blabla.com"
                        required
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        name="password"
                        defaultValue="checkcheck1"
                        required
                    />
                    <label htmlFor="loginPasswordConfirm">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPasswordConfirm"
                        placeholder="Password"
                        name="password2"
                        defaultValue="checkcheck1"
                        required
                    />
                    <button type="button" className="btn btn-primary" onClick={this.onClick}>
                        Join
          </button>
                </div>
            </form>
        );
    }

    validatForm = (): boolean => {
        if(document.forms["register-form"]["password"].value !== document.forms["register-form"]["password2"].value) {
            console.log("Passwords must match!");
            return false;
        } else { return true; }
    }

    onClick = (e) => {
        e.preventDefault();
        let validation = this.validatForm();
        if(validation) {
            document.forms["register-form"].submit();
        }
    }
}
