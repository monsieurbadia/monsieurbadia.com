// constants

import { ACTION_TYPES_CARD3D } from '../constant/constant';

// state

export const initialStateCard3D = {
  isFlip: false,
  isLoading: true
};

export function setIsFlip ( state, payload ) {
  
  return ( {
    ...state,
    isFlip: payload
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

      return setIsFlip( state, payload );

    case ACTION_TYPES_CARD3D.IS_LOADING :

      return setIsLoading( state, payload );

    default:

      return { ...state };
  
  }

};
