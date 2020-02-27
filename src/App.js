import React from "react";
import "./App.css";
import AppNav from "./components/appnav";
import SignUpModal from "./components/modal";
import RegisterForm from "./components/register";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LeftSideBar from "./components/leftSideBar";
import RightSideBar from "./components/rightSideBar";
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
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
);

export default App;
