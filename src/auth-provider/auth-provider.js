import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import AuthConfig from '../config/auth-config'

const config = {
    auth: {
        authority: AuthConfig.REACT_APP_AUTH_AAD_AUTHORITY,
        clientId: AuthConfig.REACT_APP_AUTH_CLIENTID,
        redirectUri: AuthConfig.REACT_APP_AUTH_REDIRECTURL
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        AuthConfig.REACT_APP_AUTH_SCOPE
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)