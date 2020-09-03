import React, { FunctionComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Pomodoro from "./apps/pomodoro/Pomodoro";
import MarkdownEditor from "./apps/markdown-editor/MarkdownEditor";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pomodoro" component={Pomodoro} />
        <Route path="/markdown-editor" component={MarkdownEditor} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
