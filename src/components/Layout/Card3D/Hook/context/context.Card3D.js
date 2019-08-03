import React, {
  createContext,
  useReducer
} from 'react'

// reducers
import {
  reducerCard3D,
  initialStateCard3D
} from '../reducer/reducer.card3D';

export const Card3DContext = createContext( initialStateCard3D );

export default function Card3DProvider ( { children } ) {

  const [ state, dispatch ] = useReducer( reducerCard3D, initialStateCard3D );

  return (

    <Card3DContext.Provider value={ { state, dispatch } }>
      { children }
    </Card3DContext.Provider>
  
  );

};
