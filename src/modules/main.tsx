import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Home } from "./home";
import { About } from "./about";
import { LoginView } from "./login";
import { LogoutView } from "./logout";
import { RegisterView } from "./register";
import { NotFound } from "./not-found";
import { WelcomeView } from "./welcome";

export class Main extends React.Component<{}, {}> {
    render() {
        return (
            <main className="container-fluid main-container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/index" component={Home} />
                    <Route path="/login" component={LoginView} />
                    <Route path="/register" component={RegisterView} />
                    <Route path="/about" component={About} />
                    <Route path="/welcome" component={WelcomeView} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}
