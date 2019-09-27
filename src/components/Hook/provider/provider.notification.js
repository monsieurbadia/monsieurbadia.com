import React, { useReducer } from 'react'

// actions

import {
  setIsOpened
} from '../action/action';

// contexts

import { ContextNotification } from '../context/context';

// reducers

import { reducerNotification } from '../reducer/reducer';

// states

import { initialStateNotification } from '../state/state';

// provider

export const ProviderNotification = ( { children } ) => {

  const [ state, dispatch ] = useReducer( reducerNotification, initialStateNotification );

  const dispatchSetIsOpened = ( isOpened ) => dispatch( setIsOpened( isOpened ) );

  return (

    <ContextNotification.Provider
      value={ {
        state,
        dispatch,
        dispatchSetIsOpened
      } }>
      { children }
    </ContextNotification.Provider>

  );

};
