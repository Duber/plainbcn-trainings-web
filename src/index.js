import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './auth-provider/auth-provider';
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView();

ReactDOM.render(
  <React.StrictMode>
    <AzureAD provider={authProvider} forceLogin={true}>
      <App />
    </AzureAD>
  </React.StrictMode>,
  document.getElementById('root')
);
