import * as React from "react";

export class LoginView extends React.Component<{}, any> {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="loginEmail">User email</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    );
  }
}
