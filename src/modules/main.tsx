import * as React from "react";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import { Home } from "./home";
import { About } from "./about";
import { LoginView } from "./login";
import { LogoutView } from "./logout";
import { RegisterView } from "./register";
import { NotFound } from "./not-found";
import { WelcomeView } from "./welcome";

interface IRouteComponentProps extends RouteComponentProps<any> { id: string }

export class Main extends React.Component<any, any> {
    render() {
        return (
            <main className="container-fluid main-container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/index" component={Home} />
                    <Route path="/user" component={UserModule} />
                    <Route path="/about" component={About} />
                    <Route path="/welcome" component={WelcomeView} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}

class UserModule extends React.Component<RouteComponentProps<any>, any> {
    render() {
        const { match, location, history } = this.props;
        return (
            <div>
                <Route exact path={this.props.match.path} component={LoginView} />
                <Route path={`${this.props.match.path}/:id`} component={
                    (props: RouteComponentProps<any>) => {
                        return <UserChildPage {...this.props} id={props.match.params.id} />
                    }}
                />
            </div>
        );
    }
}

class UserChildPage extends React.Component<IRouteComponentProps, any> {
    render() {
        const { match, location, history, id } = this.props;

        switch (id) {
            case "login":
                return <LoginView />
            case "register":
                return <RegisterView {...this.props} />
            default:
                return <NotFound />
        }
    }
}

