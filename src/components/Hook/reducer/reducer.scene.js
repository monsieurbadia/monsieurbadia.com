// constants

import { ACTION_TYPES_SCENE } from '../constant/constant';

// state

import { initialStateScene } from '../state/state';

export function setSceneSetup ( state, payload ) {
  
  return ( {
    ...state,
    setup: payload
  } );

};

// reducer

export function reducerScene ( state = initialStateScene, { payload, type } ) {

  switch ( type ) {

    case ACTION_TYPES_SCENE.SET_SCENE_SETUP :

      return setSceneSetup( state, payload );

    default:

      return { ...state };
  
  }

};
