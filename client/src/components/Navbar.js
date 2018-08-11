import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
// import { NavItem } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom"


function theNavbar(props) {

  return (
    <div>
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="#brand">Copeland Engineering Webtools</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
            <MenuItem eventKey={4}>
                    <Link to={`/`}> Home </Link>
            </MenuItem>
            <NavDropdown eventKey={3} title="Maintenance" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>
                    <Link to={`/clients`}> Manage Clients </Link>
                </MenuItem>
                <MenuItem eventKey={3.2}>
                    <Link to={`/citySubs`}> Manage Cities and Subdivisions </Link>
                </MenuItem>
                <MenuItem eventKey={3.3}>
                    <Link to={`/jobNumberSeqs`}> Job Number Sequences </Link>
                </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title="Starts Management" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1}>
                    <Link to={`/starts`}> Starts List </Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.2}>
                    <Link to={`/getnextjobnumber`}> Next Job Number </Link>
                </MenuItem>
                <MenuItem eventKey={2.3}>
                    <Link to={`/create`}> Insert Start </Link>
                </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={1} title="User" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1}>Settings</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1.2}>Login/Logout</MenuItem>
            </NavDropdown>

            </Nav>

        </Navbar.Collapse>
        </Navbar>
    </div>
  );
}
export default theNavbar;

/*
<div>
<Navbar inverse collapseOnSelect>
<Navbar.Header>
    <Navbar.Brand>
    <a href="#brand">Copeland Engineering Webtools</a>
    </Navbar.Brand>
    <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
    <Nav>
    <NavItem eventKey={1} href="#">
        Link
    </NavItem>
    <NavItem eventKey={2} href="#">
        Link
    </NavItem>
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
    </NavDropdown>
    </Nav>
    <Nav pullRight>
    <NavItem eventKey={1} href="#">
        Link Right
    </NavItem>
    <NavItem eventKey={2} href="#">
        Link Right
    </NavItem>
    </Nav>
</Navbar.Collapse>
</Navbar>
</div>
*/