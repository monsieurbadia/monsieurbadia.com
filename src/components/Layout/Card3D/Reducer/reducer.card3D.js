import React, {
  createContext,
  useReducer
} from 'react';

// reducer

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

export function reducerCard3D ( state, { payload, type } ) {

  // console.log( payload );

  switch ( type ) {

    case 'flipped-to-back' :

      return setIsFlip( state, payload );

    case 'flipped-to-front' :

      return setIsFlip( state, payload );

    case 'is-loading' :

      return setIsLoading( state, payload );

    default:

      return { ...state };
  
  }

};

// context

export const Card3DContext = createContext( initialStateCard3D );

export default function Card3DProvider ( { children } ) {

  const [ state, dispatch ] = useReducer( reducerCard3D, initialStateCard3D );

  return (

    <Card3DContext.Provider value={ { state, dispatch } }>
      { children }
    </Card3DContext.Provider>
  
  );

};
