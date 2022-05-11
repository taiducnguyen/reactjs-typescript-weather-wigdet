import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from 'app/store';
import { AppRoutes } from './app/routes';
import './app/styles/style.scss';

// prepare store
const store = configureStore();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
