import * as React from "react";
import { observer } from "mobx-react";

@observer
export class App extends React.Component<{ name: string }, any> {
  render() {
    return (
      <div className="react-app">
        <h1>Hello World!, {this.props.name}</h1>
        <p>This will be our main app.</p>
      </div>
    );
  }
}
