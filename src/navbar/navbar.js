import { Component } from 'react'
import BNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { authProvider } from '../auth-provider/auth-provider';
import jwt_decode from "jwt-decode";
import { LinkContainer } from 'react-router-bootstrap'

export default class Navbar extends Component {
    getUsername() {
        let idtoken = window.localStorage.getItem("msal.idtoken")
        var decodedidtoken = jwt_decode(idtoken);
        return decodedidtoken["preferred_username"]
    }

    render() {
        return (
            <BNavbar bg="light" expand="sm">
                <BNavbar.Brand>Welcome, {this.getUsername()}</BNavbar.Brand>
                <BNavbar.Toggle />
                <BNavbar.Collapse>
                    <Nav className="mr-auto">
                        <LinkContainer exact to="/"><Nav.Link>Skills</Nav.Link></LinkContainer>
                        <LinkContainer to="/freetrack"><Nav.Link>Free Track</Nav.Link></LinkContainer>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={authProvider.logout}>Logout</Nav.Link>
                    </Nav>
                </BNavbar.Collapse>
            </BNavbar>
        )
    }
}