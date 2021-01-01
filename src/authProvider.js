// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const config = {
    auth: {
        authority: `https://login.microsoftonline.com/8c4daf01-5412-4589-86ff-f5efa0c2834f`,
        clientId: `d3e21b0d-1460-45e7-8854-32333791077c`,
        redirectUri: `http://localhost:3000`
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        'api://24ebf232-d6f5-4e7b-bacd-e95ea35fca58/auth'
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)