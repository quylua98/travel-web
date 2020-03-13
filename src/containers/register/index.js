import React from "react";
import axios from "axios";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Col,
  Badge
} from "reactstrap";
import moment from "moment";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      fullname: "",
      sex: true,
      day: 1,
      month: 1,
      year: Number.parseInt(new Date().getFullYear()),
      password: "",
      rePassword: "",
      status: "",
      modal: false,
      usernameError: "",
      emailError: "",
      fullNameError: "",
      dOfBError: "",
      passwordError: ""
    };
  }

  toggleChange = () => {
    this.setState({
      sex: !this.state.sex
    });
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let warning = "";
    switch (nam) {
      case "password":
        warning =
          val.length > 6 ? "Password should be minimum of 6 characters" : "";
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

  createOptionTag(start, stop) {
    let option = [];
    let i = start;
    for (i; i <= stop; i++) {
      option.push(<option value={i}>{i}</option>);
    }
    return option;
  }

  validate = () => {
    let flag = true;
    if (this.state.username === "") {
      this.setState({ usernameError: "Username is required." });
      flag = false;
    }
    if (this.state.email === "") {
      this.setState({ emailError: "Email is required." });
      flag = false;
    }
    if (this.state.fullname === "") {
      this.setState({ fullNameError: "Fullname is required." });
      flag = false;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: "Password is required." });
      flag = false;
    }
    let current = moment(new Date());
    if (
      moment(
        `${this.state.year}-${this.state.month}-${this.state.day}`
      ).isAfter(current)
    ) {
      this.setState({ dOfBError: "Date of birth is incorrect." });
      flag = false;
    }
    return flag;
  };

  onSubmit = event => {
    event.preventDefault();
    this.clearError();
    if (this.validate()) {
      const user = {
        username: this.state.username,
        email: this.state.email,
        fullName: this.state.fullname,
        gender: this.state.sex,
        dOfB: `${this.state.year}-${this.state.month}-${this.state.day}`,
        password: this.state.password
      };
      axios
        .put(`/api/register`, user)
        .then(res => {
          this.setState({ status: "Success" });
          this.clearError();
        })
        .catch(error => {
          if (error.response) {
            let err = JSON.parse(error.request.response);
            this.setState({ status: "" });
            this.displayError(err);
          }
        });
    }
  };

  displayError = err => {
    Object.keys(err).map(key => {
      this.setState({ [key + "Error"]: err[key] });
      return <></>;
    });
  };

  clearError = () => {
    this.setState({ usernameError: "" });
    this.setState({ emailError: "" });
    this.setState({ fullNameError: "" });
    this.setState({ dOfBError: "" });
    this.setState({ passwordError: "" });
  };

  render() {
    const currentYear = Number.parseInt(new Date().getFullYear());

    const {
      usernameError,
      emailError,
      fullNameError,
      dOfBError,
      passwordError
    } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper register-form">
          <h2>Register</h2>
          <Form>
            <FormGroup row>
              <Label for="username" sm={4}>
                Username
              </Label>
              <Col sm={8}>
                {usernameError.trim() === "" ? (
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={this.myChangeHandler}
                  />
                ) : (
                  <>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      className="is-invalid"
                      onChange={this.myChangeHandler}
                    />
                    <span className="text-danger">{usernameError}</span>
                  </>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                {emailError.trim() === "" ? (
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={this.myChangeHandler}
                  />
                ) : (
                  <>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      className="is-invalid"
                      onChange={this.myChangeHandler}
                    />
                    <span className="text-danger">{emailError}</span>
                  </>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="fullname" sm={4}>
                Full name
              </Label>
              <Col sm={8}>
                {fullNameError.trim() === "" ? (
                  <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={this.myChangeHandler}
                  />
                ) : (
                  <>
                    <Input
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="is-invalid"
                      onChange={this.myChangeHandler}
                    />
                    <span className="text-danger">{fullNameError}</span>
                  </>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Sex</Label>
              <Col sm={8}>
                <CustomInput
                  value="1"
                  type="radio"
                  id="male"
                  name="sex"
                  label="Male"
                  checked
                  onChange={this.toggleChange}
                  inline
                />
                <CustomInput
                  value="0"
                  type="radio"
                  id="female"
                  name="sex"
                  label="Female"
                  onChange={this.toggleChange}
                  inline
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="date-of-birth" sm={4}>
                Date of birth
              </Label>
              <Col sm={8}>
                <FormGroup row>
                  {dOfBError.trim() === "" ? (
                    <>
                      <Col sm={3}>
                        <FormGroup>
                          <Input
                            value={this.state.day}
                            type="select"
                            name="day"
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1, 31)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup>
                          <Input
                            value={this.state.month}
                            type="select"
                            name="month"
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1, 12)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <Input
                            value={this.state.year}
                            type="select"
                            name="year"
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1900, currentYear)}
                          </Input>
                        </FormGroup>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col sm={3}>
                        <FormGroup>
                          <Input
                            value={this.state.day}
                            type="select"
                            name="day"
                            style={borderRed}
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1, 31)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup>
                          <Input
                            value={this.state.month}
                            type="select"
                            name="month"
                            style={borderRed}
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1, 12)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <Input
                            value={this.state.year}
                            type="select"
                            name="year"
                            style={borderRed}
                            onChange={this.myChangeHandler}
                          >
                            {this.createOptionTag(1900, currentYear)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <span className="text-danger">{dOfBError}</span>
                    </>
                  )}
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>
                Password
              </Label>
              <Col sm={8}>
                {passwordError.trim() === "" ? (
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.myChangeHandler}
                  />
                ) : (
                  <>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      className="is-invalid"
                      onChange={this.myChangeHandler}
                    />
                    <span className="text-danger">{passwordError}</span>
                  </>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="re-password" sm={4}>
                Password (confirm)
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="re-password"
                  id="re-password"
                  onChange={this.myChangeHandler}
                />
              </Col>
            </FormGroup>
            <Badge color="success">{this.state.status}</Badge>
            <FormGroup row className="justify-content-center">
              <Button outline color="secondary" onClick={e => this.onSubmit(e)}>
                Register
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const borderRed = {
  borderColor: "#dc3545"
};

export default RegisterForm;
