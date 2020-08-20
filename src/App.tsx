import React, { FunctionComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Pomodoro from "./apps/pomodoro/pomodoro";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pomodoro" component={Pomodoro} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
