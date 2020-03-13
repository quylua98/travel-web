import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import avatar from "../../assets/avatar-41x41.jpg";
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
  Badge,
  Media
} from "reactstrap";
import { GOOGLE_AUTH_URL } from "../../constants/constants";

class SignInModal extends React.Component {
  componentWillMount() {
    this.props.getUserProfile();
  }

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      remember: false,
      error: [],
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
    let put = [];
    if (this.state.username === "") {
      put.push("Username is required.");
    }
    if (this.state.password === "") {
      put.push("Password is required.");
    }

    if (put && put.length > 0) {
      this.setState({ error: put });
      return false;
    } else {
      this.setState({ error: [] });
      return true;
    }
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
      this.toggle();
    }
  };

  authLink(signedIn) {
    if (signedIn == null) return;
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
          <Button color="link" onClick={() => this.props.logout()}>
            Sign Out
          </Button>
        </NavLink>
      </NavItem>
    );
  }

  userLink(signedIn, username) {
    if (signedIn) {
      return (
        <>
          <NavItem>
            <Media left href="#">
              <Media object src={avatar} style={userAvatar} />
            </Media>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="user-profile" className="text-info">
                Hi {username},
              </Link>
            </NavLink>
          </NavItem>
        </>
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
                <a color="danger" href={GOOGLE_AUTH_URL}>
                  Login with Google
                </a>
                <br />
                <Link to="register" onClick={this.toggle}>
                  Register
                </Link>
                <span> - </span>
                <React.Fragment>
                  <Link to="/reset" onClick={this.toggle}>
                    Reset Password
                  </Link>
                </React.Fragment>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {this.state.error.map(err => (
                <Badge href="#" color="danger">
                  {err}
                </Badge>
              ))}
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

const userAvatar = {
  maxHeight: 30,
  borderRadius: 20
};

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.auth.signedIn
});
const mapDispatchToProps = { logout, login, getUserProfile };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignInModal)
);
