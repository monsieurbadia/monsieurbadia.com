import React, {
  lazy,
  Suspense
} from 'react';

import {
  Route,
  Switch
} from 'react-router-dom'; 

// components

import Home from './components/Main/Home/Home';

// components lazy loading

const NotFoundComponent = lazy( () => import( './components/Main/NotFound/NotFound' /* webpackChunkName: "NotFound" */ ) );

// components wrapped

const NotFoundWrappedComponent = () => (

  <Suspense fallback={ undefined }>
    <NotFoundComponent />
  </Suspense>

);

export default function App () {

  return (

    <div className='app'>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/*' exact component={ NotFoundWrappedComponent } />
      </Switch>
    </div>
  
  );

};
