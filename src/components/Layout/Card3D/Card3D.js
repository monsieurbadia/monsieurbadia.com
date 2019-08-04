import React, {
  useContext,
  useEffect,
  useRef
} from 'react';

import debounce from 'js-utils/debounce';

// components

import Card from './Component/Card/Card';
import Loading from '../Loading/Loading';

// data

import curriculum from '../../../assets/json/curriculum.json';

// hooks

import {
  ContextCard3D,
  ContextScene
} from './Hook/context/context';

// customs

import {
  useCard3DManager,
  useSceneManager,
  useTemplateManager
} from './Hook/custom/custom';

export default function Card3D () {

  const {
    state: stateCard3D,
    dispatchIsFlipped,
    dispatchIsLoading
  } = useContext( ContextCard3D );
  
  const { dispatchSceneSetup } = useContext( ContextScene );

  const canvasRendererWebGL = useRef( null );
  const card = useRef( null );
  const cardBackgroundFront = useRef( null );
  const cardBackgroundBack = useRef( null );
  const clock = useRef( null );
  const composerRendererWebGL =  useRef( null );
  const customPerspectiveCamera = useRef( null );
  const groupRendererWebGL = useRef( null );
  const sceneRendererWebGL = useRef( null );
  const timeoutID = useRef( null );

  const card3DManager = useCard3DManager();
  const sceneManager = useSceneManager( canvasRendererWebGL.current );
  const templateManager = useTemplateManager( curriculum );

  useEffect( () => {

    if ( stateCard3D.isLoading ) {

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

  } );

  useEffect( () => {

    return () => ( stateCard3D.isLoading ) && clear();

  } );

  const clear = function clear () {

    card3DManager.clearTimeoutID( timeoutID.current );

  };

  const on = function on () {

    window.addEventListener( 'resize', debounce( () => {

      sceneManager.resize();

    } ), 1000 );

  };

  const onClick = function onClick ( event ) {

    event.stopPropagation();

    flip( stateCard3D.isFlipped );

  };

  const onInit = function onInit ( setup ) {

    on();
    clear();
    render();

    dispatchIsLoading( false );
    dispatchSceneSetup( setup );

  };

  const flip = function flip ( isFlipped ) {

    if ( isFlipped ) {

      dispatchIsFlipped( false );

    } else {

      dispatchIsFlipped( true );

    }

  };

  const init = function init ( { canvas, width, height, pixelRatio } ) {
    
    groupRendererWebGL.current = sceneManager.createGroup();

    sceneRendererWebGL.current = sceneManager.createScene( groupRendererWebGL.current );

    customPerspectiveCamera.current = sceneManager.createCamera( { width, height } );

    sceneManager.createLights( groupRendererWebGL.current );
    sceneManager.createMeshes( groupRendererWebGL.current );
    sceneManager.createRenderer( { canvas, width, height, pixelRatio } );

    composerRendererWebGL.current = sceneManager.createRendererEffect( { scene: sceneRendererWebGL.current, width, height } );

    sceneManager.createControls( customPerspectiveCamera.current );

    clock.current = sceneManager.createTimer();

    const setup = {
      camera: customPerspectiveCamera.current,
      canvas: canvasRendererWebGL.current,
      card: {
        face: {
          back: cardBackgroundBack.current,
          front: cardBackgroundFront.current
        }
      }
    };

    timeoutID.current = window.setTimeout( () => onInit( setup ), 3000 );

  };

  const render = function render () {

    sceneManager.render();

  };

  return (

    <Card
      className={ `card card-component card3d ${ stateCard3D.isFlipped ? 'js-is-flipped' : '' }` }
      card={ card }
      onClick={ !stateCard3D.isLoading ? onClick : undefined }>
      <Card.Face type='front'>
        { ( stateCard3D.isLoading ) && <Loading animated={ true } className='loading-renderer--card3d' /> }
        <Card.Background
          background={ cardBackgroundFront } 
          template={ <canvas className='canvas-renderer-webgl' ref={ canvasRendererWebGL } /> } />
        <Card.Title
          title={ <span className='card-face-link'>monsieurbadia</span> } />
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
