// constants

import { ACTION_TYPES_CARD3D } from '../constant/constant';

// actions

export const setIsFlipped = ( payload ) => ( {
  type: ACTION_TYPES_CARD3D.IS_FLIPPED,
  payload
} );

export const setIsLoading = ( payload ) => ( {
  type: ACTION_TYPES_CARD3D.IS_LOADING,
  payload
} );
