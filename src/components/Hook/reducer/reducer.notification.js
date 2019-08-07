// constants

import { ACTION_TYPES_NOTIFICATION } from '../constant/constant';

// states

import { initialStateNotification } from '../state/state';

export function setIsOpened ( state, payload ) {
  
  return ( {
    ...state,
    isOpened: payload
  } );

};

// reducer

export function reducerNotification ( state = initialStateNotification, { payload, type } ) {

  switch ( type ) {

    case ACTION_TYPES_NOTIFICATION.IS_OPENED :

      return setIsOpened( state, payload );

    default:

      return { ...state };
  
  }

};
