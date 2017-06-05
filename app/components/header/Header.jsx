import React from 'react';
import { Nav, MenuItem, Navbar, NavDropdown, NavItem } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar collapeOnSelect>
                <Navbar.Header>
                    <Navbar.Brand><a href="https://intuso.com">Intuso Home</a></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey="{1}" href="../devices">Devices</NavItem>
                    </Nav>
                    <Nav eventKey="{2}" pullRight>
                        <NavDropdown>
                            <MenuItem eventKey="{2.1}" href="../profile">Profile</MenuItem>
                            <MenuItem eventKey="{2.2}" href="../login">Sign Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header