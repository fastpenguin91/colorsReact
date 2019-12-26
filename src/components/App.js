import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Color from "./Color";
import ColorList from "./ColorList";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/colors/0" />} />
          <Route path="/color/:id">
            <Color />
          </Route>
          <Route exact path="/colors/:page">
            <ColorList />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
