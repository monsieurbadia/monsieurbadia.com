// constants

import { ACTION_TYPES_CARD3D } from '../constant/constant';

// states

import { initialStateCard3D } from '../state/state';

export const setIsFlipped = ( state, payload ) => ( {
  ...state,
  isFlipped: payload
} );

export const setIsLoading = ( state, payload ) => ( {
  ...state,
  isLoading: payload
} );

// reducer

export const reducerCard3D = ( state = initialStateCard3D, { payload, type } ) => {

  switch ( type ) {

    case ACTION_TYPES_CARD3D.IS_FLIPPED :

      return setIsFlipped( state, payload );

    case ACTION_TYPES_CARD3D.IS_LOADING :

      return setIsLoading( state, payload );

    default :

      return { ...state };
  
  }

};
