import "./css/main.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "./modules/main";
import { Header } from "./modules/header";

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById("app"))


