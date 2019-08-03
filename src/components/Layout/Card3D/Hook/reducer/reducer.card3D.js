// state

export const initialStateCard3D = {
  isFlip: {
    camera: {},
    canvas: {},
    card: {
      face: {
        back: null,
        front: null
      }
    },
    value: false
  },
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

export function reducerCard3D ( state, { payload, type } ) {

  switch ( type ) {

    case 'IS_FLIPPED' :

      return setIsFlip( state, payload );

    // case 'flipped-to-front' :

    //   return setIsFlip( state, payload );

    case 'IS_LOADING' :

      return setIsLoading( state, payload );

    default:

      return { ...state };
  
  }

};
