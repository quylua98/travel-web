import React, { useState } from "react";
import axios from "axios";  
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  CustomInput,
  Col,
  Row,
  Badge
} from "reactstrap";
import { API_URL } from '../../constants';

export default class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error : "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

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
  }

  onSubmit = event => {
    event.preventDefault();
    if (this.validate()) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      axios.post(`/api/auth/login`, user ,{'Content-Type': 'application/json'})
        .then(res => {
          localStorage.setItem("token",res.data);
        })
        .catch(error => {
          this.setState({ error: error });
        })
    }
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
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
                    <InputGroupText><FaUserAlt /></InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" name="username" onChange={this.myChangeHandler} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><FaLock /></InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" name="password" onChange={this.myChangeHandler} />
                </InputGroup>
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" name="check" id="remember" />
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
                <a href="#">Reset Password</a>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Badge href="#" color="danger">
                {this.state.error}
              </Badge>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    );
  }
}
