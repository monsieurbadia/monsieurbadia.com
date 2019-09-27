// constants

import { ACTION_TYPES_SCENE } from '../constant/constant';

// state

import { initialStateScene } from '../state/state';

export const  setSceneSetup = ( state, payload ) => ( {
  ...state,
  setup: payload
} );


// reducer

export const  reducerScene = ( state = initialStateScene, { payload, type } ) => {

  switch ( type ) {

    case ACTION_TYPES_SCENE.SET_SCENE_SETUP :

      return setSceneSetup( state, payload );

    default :

      return { ...state };
  
  }

};
