// constants

import { ACTION_TYPES_NOTIFICATION } from '../constant/constant';

// actions

export const setIsOpened = ( payload ) => ( {
  type: ACTION_TYPES_NOTIFICATION.IS_OPENED,
  payload
} );