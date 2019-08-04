import {
  useContext,
  useEffect,
  useRef
} from 'react';

import anime from 'animejs';

// hooks
import { ContextCard3D } from '../context/context.card3D';
import { ContextScene } from '../context/context.scene';

export default function useCard3DManager () {

  const timeoutID = useRef( null );

  const { state: stateCard3D } = useContext( ContextCard3D );
  const { state: stateScene } = useContext( ContextScene );

  useEffect( () => {

    const { isFlipped } = stateCard3D;
    const { setup } = stateScene;

    flip( isFlipped, setup );

  } );

  const clearTimeoutID = function clearTimeoutID ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer ( timer ) {

    timer.time = 0;

  };

  const onFlip = function onFlip ( isFlipped, { camera, canvas, card } ) {

    if ( card.face.back !== null ) {

      const { position } = camera;

      switch ( isFlipped ) {

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

  const flip = async function flip ( isFlipped, setup ) {

    clearTimeoutID( timeoutID.current );

    timeoutID.current = window.setTimeout( () => onFlip( isFlipped, setup ), 250 );

  };

  return ( {
    flip,
    clearTimeoutID,
    clearTimer
  } );

};