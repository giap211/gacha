import "./App.css";
import React from "react";
import Main from "./components/Main";
import Collections from "./components/Collections";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/myCollection" component={Collections} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
