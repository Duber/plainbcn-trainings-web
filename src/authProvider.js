// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const config = {
    auth: {
        authority: process.env.REACT_APP_AUTH_AAD_AUTHORITY,
        clientId: process.env.REACT_APP_AUTH_CLIENTID,
        redirectUri: process.env.REACT_APP_AUTH_REDIRECTURL
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        process.env.REACT_APP_AUTH_SCOPE
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)