// constants

import { ACTION_TYPES_NOTIFICATION } from '../constant/constant';

// states

import { initialStateNotification } from '../state/state';

export const setIsOpened = ( state, payload ) => ( {
  ...state,
  isOpened: payload
} );

// reducer

export const reducerNotification = ( state = initialStateNotification, { payload, type } ) => {

  switch ( type ) {

    case ACTION_TYPES_NOTIFICATION.IS_OPENED :

      return setIsOpened( state, payload );

    default :

      return { ...state };
  
  }

};
