import { Component } from 'react'
import { authProvider } from '../auth-provider/auth-provider';
import jwt_decode from "jwt-decode";
import NavbarLink from './navbar-link'

export default class Navbar extends Component {
    getUsername() {
        const idtoken = window.localStorage.getItem("msal.idtoken")
        const decodedidtoken = jwt_decode(idtoken);
        return decodedidtoken["preferred_username"]
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <span className="navbar-brand">Welcome, {this.getUsername()}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mr-auto">
                        <NavbarLink label="Skills" to="/skill" />
                        <NavbarLink label="Free Track" to="/freetrack"/>
                    </ul>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item"><button className="nav-link btn btn-link" onClick={authProvider.logout}>Logout</button></li>
                    </ul>
                </div>
            </nav>
        )
    }
}