import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routers from "../config/routers";

export default function Routers() {
  return (
    <Router>
      <Switch>
        {routers.map((route, i) => (
          <Route {...route} key={i} />
        ))}
      </Switch>
    </Router>
  );
}
