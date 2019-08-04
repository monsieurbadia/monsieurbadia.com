import React, {
  useContext,
  useEffect,
  useRef
} from 'react';

import debounce from 'js-utils/debounce';

// actions

import {
  setIsFlipped,
  setIsLoading,
  setSceneSetup
} from './Hook/action/action';

// components

import Card from './Component/Card/Card';
import Loading from '../../Common/Loading/Loading';

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

// a basic custom dispatcher ( it's a kind of mapDispatchToProps method from redux )

const dispatcher = ( dispatch ) => ( {

  setIsFlipped: ( isFlipped ) => dispatch( setIsFlipped( isFlipped ) ),
  setIsLoading: ( isLoading ) => dispatch( setIsLoading( isLoading ) ),
  setSceneSetup: ( setup ) => dispatch( setSceneSetup( setup ) )

} );

export default function Card3D () {

  const { state: stateCard3D, dispatch: dispatchCard3D } = useContext( ContextCard3D );
  const { dispatch: dispatchScene } = useContext( ContextScene );

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

  const onInit = function onInit () {

    on();
    clear();
    render();

    dispatcher( dispatchCard3D )
      .setIsLoading( false );

    dispatcher( dispatchScene )
      .setSceneSetup( {
        camera: customPerspectiveCamera.current,
        canvas: canvasRendererWebGL.current,
        card: {
          face: {
            back: cardBackgroundBack.current,
            front: cardBackgroundFront.current
          }
        }
      } );

  };

  const flip = function flip ( isFlipped ) {

    if ( isFlipped ) {

      dispatcher( dispatchCard3D )
        .setIsFlipped( false );

    } else {

      dispatcher( dispatchCard3D )
        .setIsFlipped( true );

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

    timeoutID.current = window.setTimeout( onInit, 3000 );

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
