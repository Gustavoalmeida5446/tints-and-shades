import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://2509937a93fc92ab2d96a561ea7452ff@o4508960864141312.ingest.us.sentry.io/4508960870301696",
//   integrations: [Sentry.browserTracingIntegration()],
//   tracePropagationTargets: ["https://myproject.org", /^\/api/],
//   });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router basename="/">
    <App />
    </Router>
);
