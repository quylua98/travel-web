import React from "react";
import "./App.css";
import "./assets/css/font-awesome.css";
import AppNav from "./components/appnav";
import RegisterForm from "./components/register";
import ResetForm from "./components/resetPassword";
import { Container, Row, Col } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  browserHistory
} from "react-router-dom";
import Home from "./components/home";

const App = () => (
  <div style={{ backgroundColor: "#F2F2F2" }}>
    <Router>
      <div>
        <AppNav />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/reset" component={ResetForm} />
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
);

export default App;
