import React from 'react';
import { Route, Switch } from 'react-router-dom'; 

// components
import Home from './components/Main/Home/Home';

export default function App () {

  return (

    <div className='app'>
      <Switch>
        <Route path='/' exact component={ Home } />
      </Switch>
    </div>
  
  );

};
