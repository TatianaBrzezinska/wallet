import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeAPI } from './api';
import { App } from './components';

import './style.css';

initializeAPI();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
