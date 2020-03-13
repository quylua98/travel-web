import React, { Component } from "react";
import queryString from "query-string";
import { getUserProfile } from "../modules/userAuthentication/auth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { JWT_TOKEN } from "../constants/constants";

class CallBackLoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null
    };
  }

  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    localStorage.setItem(JWT_TOKEN, params.token);
    this.props.getUserProfile();
  }

  redirect = signedIn => {
    if (signedIn == null) return;
    if (signedIn) {
      this.props.history.push("/");
    }
  };

  render() {
    const { signedIn } = this.props.auth;
    return <>{this.redirect(signedIn)}</>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { getUserProfile };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CallBackLoginGoogle)
);
