import * as React from "react";
import { Link } from "react-router-dom";

export class Header extends React.Component<{}, {}> {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="#">MyApp</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <a className="nav-link" href="/user/login">Login</a>
                            </li>
                            <li>
                                <a className="nav-link" href="/user/register">Sign up</a>
                            </li>
                            <li>
                                <a className="nav-link" href="/about">About</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

