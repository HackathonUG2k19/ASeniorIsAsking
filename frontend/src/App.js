import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MakeRequest from "./MakeRequest";
import RequestStatus from "./RequestStatus";
import ViewRequests from "./ViewRequests";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <ViewRequests />
        </Route>
        <Route exact path="/make-request">
          <MakeRequest />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
