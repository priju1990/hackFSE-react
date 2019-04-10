import React from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import ViewFeedback from "./viewFeedback";
import CreateEvent from "./createEvent";
import createRoles from './createRoles'
//import Logout from "../logout";
import "../styles.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="container">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/createEvent">Create events</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/createRoles">Create Roles</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  {" "}
                  <Link to="/view">View feedback</Link>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink>
                  {" "}
                  <Link to="/logout">Logout </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
        <Route path="/createEvent" component={CreateEvent} />
        <Route path="/createRoles" component={createRoles} />
          <Route path="/createRoles" Logout />
          <Route path="/view" component={ViewFeedback} />
          <Route path="/logout" Logout />
        </Switch>
      </div>
    );
  }
}
export default AdminHome;
