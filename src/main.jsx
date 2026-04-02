import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import WatchlistProvider from './context/WatchlistContext.jsx';
import './index.css';

// Initialize React app with Context Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>
);
