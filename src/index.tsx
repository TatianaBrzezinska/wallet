import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initializeAPI } from './app/api';
import { App } from './app/components/App/App';
import { store } from './app/store';

import './style.css';

initializeAPI();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
