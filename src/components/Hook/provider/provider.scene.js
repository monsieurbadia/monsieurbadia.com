import React, { useReducer } from 'react'

// actions

import {
  setSceneSetup
} from '../action/action';

// contexts

import { ContextScene } from '../context/context';

// reducers

import { reducerScene } from '../reducer/reducer';

// states

import { initialStateScene } from '../state/state';

// provider

export const ProviderScene = ( { children } ) => {

  const [ state, dispatch ] = useReducer( reducerScene, initialStateScene );

  const dispatchSceneSetup = ( setup ) => dispatch( setSceneSetup( setup ) );

  return (

    <ContextScene.Provider
      value={ {
        state,
        dispatch,
        dispatchSceneSetup
      } }>
      { children }
    </ContextScene.Provider>

  );

};
