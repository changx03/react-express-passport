import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Home } from "./home";
import { About } from "./about";

export const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/index" component={Home} />
      <Route path="/roster" component={Roster} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
)

const Roster = () => (
  <Switch>
    {/* <Route exact path="/roster" component={FullRoster}/>
    <Route path="/roster/:number" component={Player}/> */}
  </Switch>
)

// const FullRoster = () => (
//   <div>
//     <ul>
//       {PlayerAPI.all().map(p => (
//         <li key={p.number}>
//           <Link to={`/roster/${p.number}`}>{p.name}</Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// );