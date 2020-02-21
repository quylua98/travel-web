import React from "react";
import "./App.css";
import AppNav from "./components/appnav";
import SignUpModal from "./components/modal";
import RegisterForm from "./components/register";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home";

const App = () => (
  <div style={{ backgroundColor: '#4A4E69'}}>
    <Router>
      <div>
        <AppNav />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterForm} />
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
);

export default App;
