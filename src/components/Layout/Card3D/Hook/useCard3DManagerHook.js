import { useEffect, useReducer, useRef } from 'react';

// import anime from 'animejs';

// import { Clock } from 'three';

import { initialStateCard3D, reducerCard3D } from '../Reducer/reducer.card3D';

let isFlippedFlag = false;

export default function useCard3DManagerHook () {

  // const clock = useRef( new Clock() );
  const timeoutID = useRef( { card3d: null, renderer: null } );
  const timer = useRef( { time: 0, duration: 10 } );

  const [ isFlipped, setIsFlipped ] = useReducer( reducerCard3D, initialStateCard3D );

  useEffect( () => {

    // console.log( isFlipped );

  }, [ isFlipped  ] );

  const clearTimeoutID = function clearTimeoutID ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer () {

    timer.current.time = 0;

  };

  const onFlip = function onFlip ( /* { camera, canvas, card } */ ) {

    // const { position } = camera;

    isFlippedFlag = !isFlippedFlag;

    ( isFlippedFlag )
      ? setIsFlipped( { type: 'is-flipped-to-back', payload: isFlippedFlag } )
      : setIsFlipped( { type: 'is-flipped-to-front', payload: isFlippedFlag } );

    // switch ( isFlippedCurrent.current ) {

    //   case true :

    //     card.cardBackgroundBack.current.appendChild( canvas );

    //     anime( {
    //       targets: position,
    //       z: 150,
    //       round: 1,
    //       delay: 150,
    //       duration: 300,
    //       easing: 'easeInQuad'
    //     } );

    //     break;

    //   case false :

    //     card.cardBackgroundFront.current.appendChild( canvas );

    //     anime( {
    //       targets: position,
    //       z: 100,
    //       round: 1,
    //       delay: 150,
    //       duration: 300,
    //       easing: 'easeOutQuad'
    //     } );

    //     break;

    //   default :

    //     return null;

    // }

  };

  const flip = function flip ( /* { domElement, camera, canvas, card } */ ) {

    // if ( domElement !== null ) {

    //   domElement.classList.toggle( 'is-flipped' );

      // clearTimer();
      // clearTimeoutID( timeoutID.current.card3d );
      // setIsFlipped( isFlippedCurrent.current );

      timeoutID.current.card3d = window.setTimeout( () => onFlip( /* { camera, canvas, card } */ ), 250 );

    // }

  };

  return ( {
    isFlipped,
    flip,
    clearTimeoutID,
    clearTimer,
    setIsFlipped,
    onFlip
  } );

};