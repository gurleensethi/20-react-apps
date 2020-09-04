import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import navigationMeta from "./common/navigation-meta";
import path from "path";

const Navigation: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        {navigationMeta.map(({ component: Component, path: routePath }) => (
          <Route
            key={routePath}
            path={path.join("/", routePath)}
            component={Component}
          />
        ))}
        <Route key="/" path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Navigation;
