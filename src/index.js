import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// components

import App from './App';
import Credits from './components/Common/Credits/Credits';

// service worker

import * as serviceWorker from './serviceWorker';

ReactDOM.render(

  <BrowserRouter>
    <App />
    <Credits />
  </BrowserRouter>,

  document.getElementById( 'root' )

);

// service worker
serviceWorker.register();
