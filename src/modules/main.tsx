import * as React from "react";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import { Home } from "./home";
import { About } from "./about";
import { LoginView } from "./login";
import { LogoutView } from "./logout";
import { RegisterView } from "./register";
import { NotFound } from "./not-found";
import { WelcomeView } from "./welcome";

interface IRouteComponentProps extends RouteComponentProps<any> { }

export class Main extends React.Component<{}, {}> {
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

class UserModule extends React.Component<IRouteComponentProps, {}> {
    render() {
        return (
            <div>
                <Route exact path={this.props.match.path} component={LoginView} />
                <Route path={`${this.props.match.path}/:id`} component={
                    (props: IRouteComponentProps) => {
                        return UserChildPage(props.match.params.id)
                    }}
                />
            </div>
        );
    }
}

const UserChildPage = (id: string) => {
    switch(id) {
        case "login":
            return <LoginView />
        case "register":
            return <RegisterView />
        default:
            return <NotFound />
    }
}
