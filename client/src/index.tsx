import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './serviceWorker';

dotenv.config()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' } })}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
