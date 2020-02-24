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
  Row,
  Badge,
  Container
} from "reactstrap";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      fullname: "",
      sex: null,
      day: 1,
      month: 1,
      year: Number.parseInt(new Date().getFullYear()),
      password: "",
      rePassword: "",
      error: "",
      status: "",
      modal: false
    };
  }

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = "";
    switch (nam) {
      case "password":
        err =
          val.length > 6 ? "Password should be minimum of 6 characters" : "";
        break;
      case "re-password":
        err =
          val != this.state.password ? "Password (confirm) is not matched" : "";
        break;
    }
    this.setState({ error: err });
    this.setState({ [nam]: val });
  };

  createOptionTag(start,stop){
    let option = [];
    let i = start;
    for (i; i <= stop; i++) {
      option.push(<option value={i}>{i}</option>);
    }
    return option;
  }

  validate = () => {
    if (this.state.username === "") {
      this.setState({ error: "Username is required." });
      return false;
    } else if (this.state.email === "") {
      this.setState({ error: "Email is required." });
      return false;
    } else if (this.state.fullname === "") {
      this.setState({ error: "Fullname is required." });
      return false;
    } else if (this.state.sex > 2) {
      this.setState({ error: "Sex is required." });
      return false;
    } else {
      let current = new Date();
      if (this.state.year >= current.getFullYear())
        if (this.state.month >= current.getMonth())
          if (this.state.day > current.getDay())
            this.setState({ error: "Date of birth is incorrect." });
      return false;
    }
    return true;
  };
  onSubmit = (event) => {
    event.preventDefault();
    if (this.validate) {
      const user = {
        username: this.state.username,
        email: this.state.email,
        fullName: this.state.fullname,
        gender: this.state.sex,
        day: `${this.state.day}-${this.state.month}-${this.state.year}`,
        password: this.state.password
      };
      axios.put(`/api/auth/register`, user )
        .then(res => {
          this.setState({ status: "Success" });
        })
        .catch(error =>{
          // console.log(error);
          if (error.response) {
            this.setState({ error: error.response.data.message });
          }
        })
    }
    console.log(this.validate);
  };

  render() {
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
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={this.myChangeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.myChangeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="fullname" sm={4}>
                Full name
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="fullname"
                  id="fullname"
                  onChange={this.myChangeHandler}
                />
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
                  onChange={this.myChangeHandler}
                  inline
                />
                <CustomInput
                  value="0"
                  type="radio"
                  id="female"
                  name="sex"
                  label="Female"
                  onChange={this.myChangeHandler}
                  inline
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="date-of-birth" sm={4}>
                Date of birth
              </Label>
              <Col sm={2}>
                <FormGroup>
                  <Input
                    value={this.state.day}
                    type="select"
                    name="day"
                    onChange={this.myChangeHandler}
                  >
                    {this.createOptionTag(1,31)}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={2}>
                <FormGroup>
                  <Input
                    value={this.state.month}
                    type="select"
                    name="month"
                    onChange={this.myChangeHandler}
                  >
                    {this.createOptionTag(1,12)}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <Input
                    value={this.state.year}
                    type="select"
                    name="year"
                    onChange={this.myChangeHandler}
                  >
                    {this.createOptionTag(1900,this.state.year)}                    
                  </Input>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.myChangeHandler}
                />
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
            <FormGroup row>
              <Badge color="danger">
                {this.state.error}
              </Badge>
              <Badge color="success">
                {this.state.status}
              </Badge>
            </FormGroup>
            <FormGroup row className="justify-content-center">
              <Button outline color="secondary" onClick={(e) => this.onSubmit(e)}>
                Register
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
