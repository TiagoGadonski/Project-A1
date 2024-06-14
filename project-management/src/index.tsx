import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
