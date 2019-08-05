// constants

import { ACTION_TYPES_SCENE } from '../constant/constant';

// actions

export const setSceneSetup = ( payload ) => ( {
  type: ACTION_TYPES_SCENE.SET_SCENE_SETUP,
  payload
} );