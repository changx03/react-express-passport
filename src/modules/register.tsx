import * as React from "react";
import * as Express from "express";

export class RegisterView extends React.Component<{}, any> {
  render() {
    return (
      <form action="register" method="post">
        <div className="form-group">
          <label htmlFor="loginName">User name</label>
          <input
            type="text"
            className="form-control"
            id="loginName"
            name="name"
            defaultValue="Test Name"
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
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="Password"
            name="password"
            defaultValue="checkcheck"
          />
          <label htmlFor="loginPasswordConfirm">Confirm password</label>
          <input
            type="password"
            className="form-control"
            id="loginPasswordConfirm"
            placeholder="Password"
            name="password2"
            defaultValue="checkcheck"
          />
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </div>
      </form>
    );
  }
}
