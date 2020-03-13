import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ResetPasword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      isSubmit: false
    };
  }

  onChangeValue = event => {
    let nam = event.target.name;
    let val = event.target.value;
    if (val.length === 0)
      this.setState({ error: "Username or email is required." });
    else this.setState({ error: "" });
    this.setState({ [nam]: val });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.email.length === 0) {
      this.setState({ error: "Username or email is required." });
      return;
    }
    let data = {
      mail: this.state.email
    };
    axios.post("/api/forgot", data).then(this.setState({ isSubmit: true }));
  };

  handleRender = () => {
    let { isSubmit } = this.state;
    if (!isSubmit) {
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
                              id="email"
                              name="email"
                              placeholder="email address"
                              className="form-control"
                              type="email"
                              onChange={this.onChangeValue}
                            />
                          </div>
                          <div className="form-group">
                            <span className="text-danger">
                              {this.state.error}
                            </span>
                          </div>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            onClick={e => this.onSubmit(e)}
                          >
                            Reset Password
                          </button>
                        </div>

                        <input
                          type="hidden"
                          className="hide"
                          name="token"
                          id="token"
                          value=""
                        />
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
                    <p>
                      Check your email for a link to reset your password. If it
                      doesn’t appear within a few minutes, check your spam
                      folder..
                    </p>
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
    return <>{this.handleRender()}</>;
  }
}
export default ResetPasword;
