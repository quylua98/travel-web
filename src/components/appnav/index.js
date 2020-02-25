import React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import SignInModal , {SignUpModal} from '../modal';
import logo from '../../assets/logo.png';
import { Navbar, NavbarBrand, Nav, NavItem, Media, NavLink } from "reactstrap";

class AppNav extends React.Component {
  render() {
    return (
      <div>

        <Navbar color="white" expand={true} style={nav}>
          <Nav>
            <NavItem>
              <NavLink><Link to="/"><Media object style={imgStyle} src={logo} alt="logo" /></Link></NavLink>
            </NavItem>
          </Nav>
          <Nav className="d-flex ml-auto" horizontal="end" navbar>
            <NavItem>
              {/* <Button onclick={<SignUpModal isShow =! isShow />} color="info">Sign In</Button> */}
              <SignInModal buttonLabel="Sign In" />
            </NavItem>
          </Nav>
        </Navbar>
        </div>
    );
  }
}

const imgStyle = {
  maxHeight: 50,
  maxWidth: 50
}

const nav = {
  maxHeight: 61,
  borderBottom: '1px solid #e0e0e0'
}

export default AppNav;
