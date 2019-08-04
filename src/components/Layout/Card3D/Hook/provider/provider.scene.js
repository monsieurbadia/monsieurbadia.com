import React, { useReducer } from 'react'

// contexts

import { ContextScene } from '../context/context';

// reducers

import { reducerScene } from '../reducer/reducer';

// states

import { initialStateScene } from '../state/state';

// provider

export function ProviderScene ( { children } ) {

  const [ state, dispatch ] = useReducer( reducerScene, initialStateScene );

  return (

    <ContextScene.Provider value={ { state, dispatch } }>
      { children }
    </ContextScene.Provider>
  
  );

};