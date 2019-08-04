import React, { useReducer } from 'react';

// contexts

import { ContextCard3D } from '../context/context';

// reducers

import {
  reducerCard3D,
  initialStateCard3D
} from '../reducer/reducer';

// provider

export function ProviderCard3D ( { children } ) {

  const [ state, dispatch ] = useReducer( reducerCard3D, initialStateCard3D );

  return (

    <ContextCard3D.Provider value={ { state, dispatch } }>
      { children }
    </ContextCard3D.Provider>
  
  );

};
