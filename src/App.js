import React from "react";
import "./App.css";
import AppNav from "./containers/appnav";
import RegisterForm from "./containers/register";
import ResetForm from "./containers/resetPassword";
import NewPassword from "./containers/newPassword";
import UserProfile from "./containers/userProfile";
import CallBackLoginGoogle from "./components/LoginSocial";
import Home from "./containers/home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <div style={{ backgroundColor: "#F2F2F2" }}>
    <Router>
      <div>
        <AppNav />
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/reset" component={ResetForm} />
            <Route exact path="/new-password" component={NewPassword} />
            <Route exact path="/user-profile" component={UserProfile} />
            <Route
              exact
              path="/oauth2/redirect"
              component={CallBackLoginGoogle}
            />
          </Switch>
        </>
      </div>
    </Router>
  </div>
);

export default App;
