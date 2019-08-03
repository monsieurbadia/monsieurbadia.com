import React, {
  useContext,
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
import { Card3DContext } from './Reducer/reducer.card3D';

export default function Card3D () {

  const { state, dispatch } = useContext( Card3DContext );

  const canvasRendererWebGL = useRef( null );
  const card = useRef( null );
  const cardBackgroundFront = useRef( null );
  const cardBackgroundBack = useRef( null );
  const composerRendererWebGL =  useRef( null );
  const customPerspectiveCamera = useRef( null );
  const groupRendererWebGL = useRef( new Group() );
  const sceneRendererWebGL = useRef( null );
  const timeoutID = useRef( { card3d: null, renderer: null } );
  const timer = useRef( { time: 0, duration: 10 } );

  const card3DManager = useCard3DManagerHook();
  const sceneManager = useSceneManagerHook( canvasRendererWebGL.current );
  const templateManager = useTemplateManagerHook( curriculum );

  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () => {

    if ( isLoading ) {

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

    card3DManager.clearTimeoutID( timeoutID.current.renderer );

  };

  const clearTimer = function clearTimer () {

    card3DManager.clearTimer( timer.current );

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

    }

  };

  const onInit = function onInit () {

    on();
    clearTimer();
    render();

    setIsLoading( false );

  };

  const flip = function flip () {

    if ( card.current !== null && state.isFlip.value ) {

      dispatch( {
        type: 'flipped-to-front',
        payload: {
          value: false,
          camera: customPerspectiveCamera.current,
          canvas: canvasRendererWebGL.current,
          card: {
            face: {
              back: cardBackgroundBack.current,
              front: cardBackgroundFront.current
            }
          }
        } 
      } );

    } else {

      dispatch( {
        type: 'flipped-to-back',
        payload: {
          value: true,
          camera: customPerspectiveCamera.current,
          canvas: canvasRendererWebGL.current,
          card: {
            face: {
              back: cardBackgroundBack.current,
              front: cardBackgroundFront.current
            }
          }
        } 
      } );

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

    sceneManager.createTimer();

    timeoutID.current.renderer = window.setTimeout( onInit, 3000 );

  };

  const render = function render () {

    sceneManager.render();

  };

  return (

    <Card
      className={ `card card-component ${ state.isFlip.value ? 'is-flipped' : '' }` }
      card={ card }
      onClick={ onClick }>
      <Card.Face type='front'>
        { ( isLoading ) && <Loading animated={ true } className='loading-renderer--card3d' /> }
        <Card.Background
          background={ cardBackgroundFront } 
          template={ <canvas className='canvas-renderer-webgl' ref={ canvasRendererWebGL } /> } />
        <Card.Title
          title={ <span arial-label='email contact' className='card-face-link' href='mailto:iam@monsieurbadia.com'>monsieurbadia</span> } />
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
