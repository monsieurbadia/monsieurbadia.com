import {
  useContext,
  useEffect,
  useRef
} from 'react';

import anime from 'animejs';

// hooks
import { Card3DContext } from './context/context.Card3D';

export default function useCard3DManagerHook () {

  const timeoutID = useRef( null );
  const timer = useRef( { time: 0, duration: 10 } );

  const { state } = useContext( Card3DContext );

  useEffect( () => {

    const { isFlip } = state;

    flip( isFlip );

  } );

  const clearTimeoutID = function clearTimeoutID ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer ( timer ) {

    timer.time = 0;

  };

  const onFlip = function onFlip ( { camera, canvas, card, value } ) {

    if ( card.face.back !== null ) {

      const { position } = camera;

      switch ( value ) {

        case true :

          card.face.back.appendChild( canvas );

          anime( {
            targets: position,
            z: 150,
            round: 1,
            delay: 150,
            duration: 300,
            easing: 'easeInQuad'
          } );

          break;

        case false :

          card.face.front.appendChild( canvas );

          anime( {
            targets: position,
            z: 100,
            round: 1,
            delay: 150,
            duration: 300,
            easing: 'easeOutQuad'
          } );

          break;

        default :

          return null;

      }

    }

  };

  const flip = async function flip ( isFlip ) {

    clearTimer( timer.current );
    clearTimeoutID( timeoutID.current );

    timeoutID.current = window.setTimeout( () => onFlip( isFlip ), 250 );

  };

  return ( {
    flip,
    clearTimeoutID,
    clearTimer
  } );

};
