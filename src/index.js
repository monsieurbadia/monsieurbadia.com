import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// componenets
import App from './App';
import Credits from './components/Common/Credits/Credits';
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
