import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import AuthConfig from '../config/auth-config'

const config = {
    auth: {
        authority: AuthConfig.AUTH_AAD_AUTHORITY,
        clientId: AuthConfig.AUTH_CLIENTID,
        redirectUri: AuthConfig.AUTH_REDIRECTURL
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        AuthConfig.AUTH_SCOPE
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)