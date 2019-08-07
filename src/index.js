import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// components

import App from './App';
import Credits from './components/Common/Credits/Credits';

// providers

import {
  ProviderCard3D,
  ProviderNotification,
  ProviderScene
} from './components/Hook/provider/provider';

// service worker

import * as serviceWorker from './serviceWorker';

ReactDOM.render(

  <BrowserRouter>
    <ProviderScene>
      <ProviderNotification>
        <ProviderCard3D>
          <App />
          <Credits />
        </ProviderCard3D>
      </ProviderNotification>
    </ProviderScene>
  </BrowserRouter>,

  document.getElementById( 'root' )

);

// service worker register

serviceWorker.register();
