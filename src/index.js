import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
