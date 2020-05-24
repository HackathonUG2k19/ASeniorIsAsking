import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MakeRequest from "./MakeRequest";
import RequestStatus from "./RequestStatus";
import AcceptRequest from "./AcceptRequest";
import ViewRequests from "./ViewRequests";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ViewRequests} />
        <Route exact path="/make-request" component={MakeRequest} />
        <Route
          exact
          path="/accept-request/:orderId"
          component={AcceptRequest}
        />
        <Route exact path="request-status/:orderId" component={RequestStatus} />
      </Switch>
    </Router>
  );
}

export default App;
