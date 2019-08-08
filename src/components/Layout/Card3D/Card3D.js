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

// contexts

import {
  ContextCard3D,
  ContextNotification,
  ContextScene
} from '../../Hook/context/context';

// customs

import {
  useCard3DManager,
  useSceneManager,
} from '../../Hook/custom/custom';

export default function Card3D () {

  const {
    state:stateCard3D,
    dispatchIsFlipped,
    dispatchIsLoading
  } = useContext( ContextCard3D );

  const { dispatchSetIsOpened } = useContext( ContextNotification );

  const { dispatchSceneSetup } = useContext( ContextScene );

  const canvasRendererWebGL = useRef( null );
  const card = useRef( null );
  const cardBackgroundFront = useRef( null );
  const cardBackgroundBack = useRef( null );
  const timeoutID = useRef( null );

  const card3DManager = useCard3DManager( curriculum );
  const sceneManager = useSceneManager();

  let camera;
  let group;
  let scene;

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

    sceneManager.clearTimeout( timeoutID.current );

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

    group = sceneManager.createGroup();

    scene = sceneManager.createScene( group );

    camera = sceneManager.createCamera( { width, height } );

    sceneManager.createLights( group );
    sceneManager.createMeshes( group );
    sceneManager.createRenderer( { canvas, width, height, pixelRatio } );
    sceneManager.createRendererEffect( { scene: scene, width, height } );
    sceneManager.createControls( camera );
    sceneManager.createClock();
    sceneManager.createTimer( { time: 0, duration: 10 } );

    const card = {
      face: {
        back: cardBackgroundBack.current,
        front: cardBackgroundFront.current
      }
    };

    const setup = {
      camera,
      canvas,
      card
    };

    timeoutID.current = window.setTimeout( () => onInit( setup ), 3000 );

  };

  const open = function open ( event ) {

    event.preventDefault();
    event.stopPropagation();

    dispatchSetIsOpened( true );

  };

  const render = function render () {

    sceneManager.render();

  };

  return (

    <Card
      className={ `card card-component card3d ${ stateCard3D.isFlipped ? 'js-is-flipped' : '' }` }
      card={ card }
      onClick={ ( !stateCard3D.isLoading ) ? onClick : undefined }>
      <Card.Face type='front'>
        { ( stateCard3D.isLoading ) && <Loading animated={ true } className='loading-renderer--card3d' /> }
        <Card.Background
          background={ cardBackgroundFront } 
          template={ <canvas className='canvas-renderer-webgl' ref={ canvasRendererWebGL } /> } />
        <Card.Title
          title={ <span onClick={ open } className='card-face-link'>monsieurbadia</span> } />
        <Card.Content template={ card3DManager.setTemplateSkills() } />
      </Card.Face>
      <Card.Face type='back'>
        <Card.Background background={ cardBackgroundBack } />
        <Card.Title title={ <span className='card-face-link'>experiences</span> } />
        <Card.Content template={ card3DManager.setTemplateExperience() } />
      </Card.Face>
    </Card>

  );

};
