import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import anime from 'animejs';

import debounce from 'js-utils/debounce';

import {
  Clock,
  Group
} from 'three';

// components
import Card from './Component/Card/Card';
import Loading from '../../Common/Loading/Loading';

// data
import curriculum from '../../../assets/json/curriculum.json';

// hooks
import useCard3DManagerHook from './Hook/useCard3DManagerHook';
import useSceneManagerHook from './Hook/useSceneManagerHook';
import useTemplateManagerHook from './Hook/useTemplateManagerHook';

export default function Card3D () {

  const canvasRendererWebGL = useRef( null );
  const card = useRef( null );
  const cardBackgroundFront = useRef( null );
  const cardBackgroundBack = useRef( null );
  const clock = useRef( null );
  const composerRendererWebGL =  useRef( null );
  const customPerspectiveCamera = useRef( null );
  const frameID = useRef( null );
  const groupRendererWebGL = useRef( new Group() );
  const isFlipped = useRef( false );
  const sceneRendererWebGL = useRef( null );
  const timeoutID = useRef( { card3d: null, renderer: null } );
  const timer = useRef( { time: 0, duration: 10 } );

  const card3DManager = useCard3DManagerHook();
  const sceneManager = useSceneManagerHook( canvasRendererWebGL.current );
  const templateManager = useTemplateManagerHook( curriculum );

  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () => {

    if ( canvasRendererWebGL.current !== null && isLoading ) {

      const canvas = canvasRendererWebGL.current;
      const pixelRatio = window.devicePixelRatio;
      const size = { width: 450, height: 450 };

      init( {
        canvas,
        width: size.width,
        height: size.height,
        pixelRatio
      } );

    }

  }, [ canvasRendererWebGL, isLoading ] );

  useEffect( () => {

    const canvas = canvasRendererWebGL.current;

    return () => ( canvas !== null ) && clear();

  }, [ canvasRendererWebGL ] );

  const clear = function clear () {

    clearTimeoutID( timeoutID.current.card3d );
    clearTimeoutID( timeoutID.current.renderer );

  };

  const clearTimeoutID = function clearTimeoutID ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer () {

    timer.current.time = 0;

  };

  const on = function on () {

    window.addEventListener( 'resize', debounce( () => {
    
      sceneManager.resize();
    
    } ), 1000 );

  };

  const onClick = function onClick ( event ) {

    event.stopPropagation();

    if ( !isLoading ) {

      flip();

      card3DManager.flip();

    }

  };

  const onFlip = function onFlip () {

    const { position } = customPerspectiveCamera.current;

    isFlipped.current = !isFlipped.current;      

    switch ( isFlipped.current ) {

      case true :

        cardBackgroundBack.current.appendChild( canvasRendererWebGL.current );

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

        cardBackgroundFront.current.appendChild( canvasRendererWebGL.current );

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

  };

  const flip = function flip () {

    if ( card.current !== null ) {

      card.current.classList.toggle( 'is-flipped' );

      clearTimer();
      clearTimeoutID( timeoutID.current.card3d );

      timeoutID.current.card3d = window.setTimeout( onFlip, 250 );

    }

  };

  const init = async function init ( { canvas, width, height, pixelRatio } ) {

    sceneRendererWebGL.current = sceneManager.createScene( groupRendererWebGL.current );

    customPerspectiveCamera.current = sceneManager.createCamera( { width, height } );

    sceneManager.createLights( groupRendererWebGL.current );
    sceneManager.createMeshes( groupRendererWebGL.current );
    sceneManager.createRenderer( { canvas, width, height, pixelRatio } );

    composerRendererWebGL.current = sceneManager.createRendererEffect( { scene: sceneRendererWebGL.current, width, height } );

    sceneManager.createControls( customPerspectiveCamera.current );

    clock.current = new Clock( { autoStart: false } );
    clock.current.start();

    timeoutID.current.renderer = window.setTimeout( () => {

      on();
      clearTimer();
      renderLoop();

      setIsLoading( false );
  
    }, 3000 );

  };

  const render = function render () {

    const time = clock.current.getDelta();

    timer.current.time += time;

    sceneManager.children.customSpotLight.current.render( time );
    sceneManager.children.moon.current.render( time, isFlipped.current );

    composerRendererWebGL.current.render( time );

    if ( parseInt( timer.current.time ) === timer.current.duration ) {

      flip();

    }

  };

  const renderLoop = function renderLoop () {

    frameID.current = composerRendererWebGL.current.renderer.setAnimationLoop( render );

  };

  return (

    <Card
      className='card card-component'
      canvas={ card }
      onClick={ onClick }>
      <Card.Face type='front'>
        { ( isLoading ) && <Loading animated={ true } className='loading-renderer--card3d' /> }
        <Card.Background
          background={ cardBackgroundFront } 
          template={ <canvas className='canvas-renderer-webgl' ref={ canvasRendererWebGL } /> } />
        <Card.Title
          title={ <a arial-label='email contact' className='card-face-link' href='mailto:iam@monsieurbadia.com'>monsieurbadia</a> } />
        <Card.Content template={ templateManager.setTemplateSkills() } />
      </Card.Face>
      <Card.Face type='back'>
        <Card.Background background={ cardBackgroundBack } />
        <Card.Title title={ <span className='card-face-link'>experiences</span> } />
        <Card.Content template={ templateManager.setTemplateExperience() } />
      </Card.Face>
    </Card>

  );

};
