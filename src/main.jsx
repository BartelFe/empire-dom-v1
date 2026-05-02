import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/900-italic.css';

import './index.css';
import App from './App.jsx';
import ImprintPage from './pages/ImprintPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <SpeedInsights />
      <Analytics />
      <Routes>
        <Route path="/"                 element={<App />} />
        <Route path="/imprint"          element={<ImprintPage />} />
        <Route path="/privacy-policy"   element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
