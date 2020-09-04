import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
