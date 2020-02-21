import React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import SignInModal , {SignUpModal} from '../modal';
import Home from '../home';
import logo from '../../assets/logo.png';
import { Navbar, NavbarBrand, Nav, NavItem, Media, NavLink } from "reactstrap";

class AppNav extends React.Component {
  render() {
    return (
      <div>

        <Navbar color="dark" expand={true} >
          <Media object style={imgStyle} src={logo} alt="logo" />
          <Nav>
            <NavItem>
              <NavLink><Link to="/">My Page</Link></NavLink>
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

export default AppNav;
