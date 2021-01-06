import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import './welcome-message.css'

export default class WelcomeMessage extends Component {

    getUsername(){
        let idtoken = window.localStorage.getItem("msal.idtoken")
        var decodedidtoken = jwt_decode(idtoken);
        return decodedidtoken["preferred_username"]
    }

    render() {
        return (
            <div className="welcomeMsg"><h1>Welcome, {this.getUsername()}</h1></div>
        );
    }
}