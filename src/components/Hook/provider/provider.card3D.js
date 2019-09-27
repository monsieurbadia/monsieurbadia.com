import React, { useReducer } from 'react';

// actions

import {
  setIsFlipped,
  setIsLoading
} from '../action/action';

// contexts

import { ContextCard3D } from '../context/context';

// reducers

import { reducerCard3D } from '../reducer/reducer';

// states

import { initialStateCard3D } from '../state/state';

// provider

export const ProviderCard3D = ( { children } ) => {

  const [ state, dispatch ] = useReducer( reducerCard3D, initialStateCard3D );

  const dispatchIsFlipped = ( isFlipped ) => dispatch( setIsFlipped( isFlipped ) );

  const dispatchIsLoading = ( isLoading ) => dispatch( setIsLoading( isLoading ) );

  return (

    <ContextCard3D.Provider
      value={ {
        state,
        dispatchIsLoading,
        dispatchIsFlipped
      } }>
      { children }
    </ContextCard3D.Provider>
  
  );

};
