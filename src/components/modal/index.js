import React, { useState } from "react";
import axios from "axios";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  logout,
  login,
  getUserProfile
} from "../../modules/userAuthentication/auth";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import { JWT_TOKEN } from "../../constants/constants";

class SignInModal extends React.Component {
  async componentWillMount() {
    await this.props.getUserProfile();
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
      error: "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleChange = () => {
    console.log(this.state.remember);
    this.setState({
      remember: !this.state.remember
    });
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  validate = () => {
    if (this.state.username === "") {
      this.setState({ error: "Username is required." });
      return false;
    } else if (this.state.password === "") {
      this.setState({ error: "Password is required." });
      return false;
    }
    this.setState({ error: "" });
    return true;
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.validate()) {
      const { username, password } = this.state;
      const u = username ? username.trim() : "";
      const p = password ? password.trim() : "";
      if (u.length === 0) {
        return;
      }
      let r = this.state.remember;
      this.props.login(u, p, r);
    }
  };

  authLink(signedIn) {
    if (!signedIn) {
      return (
        <NavItem>
          <Button color="danger" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
        </NavItem>
      );
    }
    return (
      <NavItem>
        <NavLink>
          <a href="#" onClick={() => this.props.logout()}>
            Sign Out
          </a>
        </NavLink>
      </NavItem>
    );
  }

  userLink(signedIn, username) {
    if (signedIn) {
      return (
        <NavItem>
          <NavLink>
            <div className="text-info">Hi {username},</div>
          </NavLink>
        </NavItem>
      );
    }
    return null;
  }

  render() {
    const { signedIn, username, error } = this.props.auth;
    return (
      <>
        {this.userLink(signedIn, username)}
        {this.authLink(signedIn)}
        <Form>
          <Modal
            fade={false}
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.className}
          >
            <ModalHeader toggle={this.toggle}>Welcome</ModalHeader>
            <ModalBody>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FaUserAlt />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    name="username"
                    onChange={this.myChangeHandler}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FaLock />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="password"
                    onChange={this.myChangeHandler}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  id="remember"
                  onChange={this.toggleChange}
                />
                <Label for="remember" check>
                  Remember Password
                </Label>
              </FormGroup>
              <FormGroup>
                <Button outline color="secondary" onClick={this.onSubmit}>
                  Login
                </Button>
                <span> OR </span>
                <Button color="danger" onClick={this.toggle}>
                  Login with Google
                </Button>
                <br />
                <Link to="register" onClick={this.toggle}>
                  Register
                </Link>
                <span>|</span>
                <React.Fragment>
                  np
                  <Link to="/reset" onClick={this.toggle}>
                    Reset Password
                  </Link>
                </React.Fragment>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Badge href="#" color="danger">
                {this.state.error}
              </Badge>
              <Badge href="#" color="danger">
                {error}
              </Badge>
            </ModalFooter>
          </Modal>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = { logout, login, getUserProfile };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignInModal)
);
