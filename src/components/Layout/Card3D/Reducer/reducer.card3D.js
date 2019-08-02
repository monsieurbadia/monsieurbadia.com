export const initialStateCard3D = { isFlip: false };

export function reducerCard3D( state, { payload, type } ) {
  switch ( type ) {
    case 'is-flipped-to-back':

      return { isFlip: payload };

    case 'is-flipped-to-front':

      return { isFlip: payload };

    default:

      return state;
  
  }

}
