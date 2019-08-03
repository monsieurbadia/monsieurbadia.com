import {
  IS_FLIPPED,
  IS_LOADING
} from '../constants';

export const setIsFlipped = dispatch => ( payload ) => dispatch( {
  type: IS_FLIPPED,
  payload
} );

export const setIsLoading = ( payload ) => ( {
  type: IS_LOADING,
  payload
} );
