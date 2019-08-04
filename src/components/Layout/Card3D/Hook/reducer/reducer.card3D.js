// constants

import { ACTION_TYPES_CARD3D } from '../constant/constant';

// states

import { initialStateCard3D } from '../state/state';

export function setIsFlipped ( state, payload ) {
  
  return ( {
    ...state,
    isFlipped: payload
  } );

};

export function setIsLoading ( state, payload ) {
  
  return ( {
    ...state,
    isLoading: payload
  } );
  
};

// reducer

export function reducerCard3D ( state = initialStateCard3D, { payload, type } ) {

  switch ( type ) {

    case ACTION_TYPES_CARD3D.IS_FLIPPED :

      return setIsFlipped( state, payload );

    case ACTION_TYPES_CARD3D.IS_LOADING :

      return setIsLoading( state, payload );

    default:

      return { ...state };
  
  }

};
