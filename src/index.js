import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './auth-provider/auth-provider';
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import AppInsightsConfig from './config/appinsights-config'

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: AppInsightsConfig.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY,
    enableAutoRouteTracking: true
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
