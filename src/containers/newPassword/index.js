import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { withRouter } from "react-router-dom";

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null,
      password: "",
      warning: "",
      token: ""
    };
  }

  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    axios
      .get("api/valid-reset-password?token=" + params.token)
      .then(res => {
        this.setState({ token: params.token });
        this.setState({ isValid: true });
      })
      .catch(error => {
        this.setState({ isValid: false });
      });
  }

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let warning = "";
    switch (nam) {
      case "password":
        warning =
          val.length < 6 ? "Password should be minimum of 6 characters" : "";
        break;
      case "re-password":
        warning =
          val !== this.state.password
            ? "Password (confirm) is not matched"
            : "";
        break;
      default:
        break;
    }
    this.setState({ warning: warning });
    this.setState({ [nam]: val });
  };

  onSubmit = event => {
    event.preventDefault();
    const { password, token } = this.state;
    const credentials = { password, token };
    axios
      .post("api/reset-password", credentials)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        let err = JSON.parse(error.request.response);
        this.setState({ warning: err.message });
      });
  };

  isValid = () => {
    if (this.state.isValid === null) return;
    if (this.state.isValid) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-md-offset-3"></div>
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="text-center">
                    <h3>
                      <i className="fa fa-lock fa-4x"></i>
                    </h3>
                    <h2 className="text-center">Forgot Password?</h2>
                    <p>You can reset your password here.</p>
                    <div className="panel-body">
                      <form autocomplete="off" className="form" method="post">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-envelope-o fa-2x" />
                            </span>
                            <input
                              id="password"
                              name="password"
                              placeholder="Password"
                              className="form-control"
                              type="password"
                              onChange={this.myChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-envelope-o fa-2x" />
                            </span>
                            <input
                              id="repassword"
                              name="re-password"
                              placeholder="Confirm password"
                              className="form-control"
                              type="password"
                              onChange={this.myChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            onClick={this.onSubmit}
                          >
                            Reset Password
                          </button>
                        </div>
                        <div className="form-group">
                          <span class="badge badge-danger">
                            {this.state.warning}
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="text-center">
                    <h3>
                      <i className="fa fa-lock fa-4x"></i>
                    </h3>
                    <h2 className="text-center">Reset your password</h2>
                    <p>Your request is expired.</p>
                    <div className="panel-body">
                      <div className="form-group">
                        <Link
                          to="/"
                          className="btn btn-lg btn-primary btn-block"
                        >
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <>{this.isValid()}</>;
  }
}
export default withRouter(NewPassword);
