import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import anime from 'animejs';

import debounce from 'js-utils/debounce';

import OrbitControls from 'three-orbitcontrols';

import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Group,
  PCFSoftShadowMap,
  Scene
} from 'three';

import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  KernelSize,
  RenderPass,
} from 'postprocessing';

// components
import Card from './Component/Card/Card';
import Colors from '../../Common/Colors/Colors';
import CustomPerspectiveCamera from '../../Common/CustomPerspectiveCamera/CustomPerspectiveCamera';
import CustomRendererWebGL from '../../Common/CustomRendererWebGL/CustomRendererWebGL';
import CustomSpotLight from '../../Common/CustomSpotLight/CustomSpotLight';
import Digits from '../../Common/Digits/Digits';
import Loading from '../../Common/Loading/Loading';
import Moon from './Mesh/Moon/Moon';

export default function Card3D () {

  const ambientLight = useRef( null );
  const bloomEffectRendererWebGL = useRef( null );
  const canvasRendererWebGL = useRef( null );
  const card = useRef( null );
  const cardBackgroundFront = useRef( null );
  const cardBackgroundBack = useRef( null );
  const clock = useRef( null );
  const composerRendererWebGL =  useRef( null );
  const customPerspectiveCamera = useRef( null );
  const customRendererWebGL = useRef( null );
  const customSpotLight = useRef( null );
  const digits = useRef( new Digits() );
  const directionalLight = useRef( null );
  const effectPassRendererWebGL = useRef( null );
  const frameID = useRef( null );
  const groupRendererWebGL = useRef( new Group() );
  const isFlipped = useRef( false );
  const moon = useRef( null );
  const orbitControls = useRef( null );
  const renderPassRendererWebGL = useRef( null );
  const sceneRendererWebGL = useRef( new Scene() );
  const timeoutID = useRef( { card3d: null, renderer: null } );
  const timer = useRef( { time: 0, duration: 10 } );

  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () => {

    if ( canvasRendererWebGL.current !== null ) {

      const size = { width: 450, height: 450 };
      const pixelRatio = window.devicePixelRatio;

      init( canvasRendererWebGL.current, {
        width: size.width,
        height: size.height,
        pixelRatio
      } );

    }

  }, [ canvasRendererWebGL ] );

  useEffect( () => {

    const canvas = canvasRendererWebGL.current;

    return () => ( canvas !== null ) && clear();

  }, [ canvasRendererWebGL ] );

  const clear = function clear () {

    clearRenderer( frameID.current );
    clearTimeoutID( timeoutID.current.card3d );
    clearTimeoutID( timeoutID.current.renderer );

  };

  const clearRenderer = function clearRenderer ( frameID ) {

    window.cancelAnimationFrame( frameID );

  };

  const clearTimeoutID = function clearTimeoutID ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer () {

    timer.current.time = 0;

  };

  const on = function on () {

    window.addEventListener( 'resize', debounce( () => {
    
      resize();
    
    } ), 1000 );

  };

  const onClick = function onClick ( event ) {

    event.stopPropagation();

    if ( !isLoading ) {

      flip();

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

  const init = async function init ( canvasRendererWebGL, { width, height, pixelRatio } ) {

    sceneRendererWebGL.current.add( groupRendererWebGL.current );

    customPerspectiveCamera.current = new CustomPerspectiveCamera( 25, ( width / height ), 0.1, 250 );
    customPerspectiveCamera.current.position.set( 0, 15, 100 );

    ambientLight.current = new AmbientLight( Colors.hexa.white, 0.25 );
    customSpotLight.current = new CustomSpotLight();
    directionalLight.current = new DirectionalLight( Colors.hexa.white, 0.75 );
    directionalLight.current.position.setScalar( 100 );

    moon.current = new Moon();

    await customSpotLight.current.create( groupRendererWebGL.current );
    await moon.current.create( groupRendererWebGL.current );

    groupRendererWebGL.current.add( ambientLight.current );
    groupRendererWebGL.current.add( directionalLight.current );   

    customRendererWebGL.current = new CustomRendererWebGL( canvasRendererWebGL, { width, height, pixelRatio } );
    customRendererWebGL.current.shadowMap.enabled = true;
    customRendererWebGL.current.shadowMap.type = PCFSoftShadowMap;
    customRendererWebGL.current.toneMappingExposure = Math.pow( 0.95, 4.0 );
    customRendererWebGL.current.setClearColor( Colors.hexa.green, 1.0 );
    customRendererWebGL.current.setGamma( true );

    bloomEffectRendererWebGL.current = new BloomEffect( {
			blendFunction: BlendFunction.SCREEN,
      distinction: 3.0,
			kernelSize: KernelSize.MEDIUM,
			resolutionScale: 0.5
    } );

    bloomEffectRendererWebGL.current.blendMode.opacity.value = 2.3;
    bloomEffectRendererWebGL.current.threshold = 0.21;
    bloomEffectRendererWebGL.current.strength = 1.2;
    bloomEffectRendererWebGL.current.radius = 0.55;

    composerRendererWebGL.current = new EffectComposer( customRendererWebGL.current );

    renderPassRendererWebGL.current = new RenderPass( sceneRendererWebGL.current, customPerspectiveCamera.current );

    effectPassRendererWebGL.current = new EffectPass( customPerspectiveCamera.current, bloomEffectRendererWebGL.current );

    effectPassRendererWebGL.current.renderToScreen = true;

    composerRendererWebGL.current.setSize( width, height );
    composerRendererWebGL.current.addPass( renderPassRendererWebGL.current );
    composerRendererWebGL.current.addPass( effectPassRendererWebGL.current );

    orbitControls.current = new OrbitControls( customPerspectiveCamera.current );
    orbitControls.current.enabled = false;
    orbitControls.current.enableRotate = true;
    orbitControls.current.enableZoom = true;
    orbitControls.current.rotateSpeed = 1.0;
    orbitControls.current.zoomSpeed = 1.2;
    orbitControls.current.panSpeed = 0.8;

    clock.current = new Clock( { autoStart: false } );
    clock.current.start();

    console.log( digits.current );

    timeoutID.current.renderer = window.setTimeout( () => {

      on();
      clearTimer();
      // renderLoop();

      setIsLoading( true );
  
    }, 300 );

  };

  const render = function render () {

    const time = clock.current.getDelta();

    timer.current.time += time;

    customSpotLight.current.render( time );
    moon.current.render( time, isFlipped.current );
    composerRendererWebGL.current.render( time );

    if ( parseInt( timer.current.time ) === timer.current.duration ) {

      flip();

    }

  };

  const renderLoop = function renderLoop () {

    frameID.current = window.requestAnimationFrame( renderLoop );

    render();

  };

  const resize = function resize () {};

  const resultCardContentFront = function resultCardContentFront () {

    return (

      <div>
        <h3 className='card-face-list-title'>creative coder</h3>
        <ul className='card-face-list'>
          <li className='card-face-list-item'>#javascript</li>
          <li className='card-face-list-item'>#canvasAPI</li>
          <li className='card-face-list-item'>#react</li>
          <li className='card-face-list-item'>#webGL</li>
          <li className='card-face-list-item'>#vue</li>
          <li className='card-face-list-item'>#three</li>
        </ul>
      </div>

    );

  };

  return (

    <Card
      className='card card-component'
      canvas={ card }
      onClick={ onClick }>
      <Card.Face type='front'>
        { ( isLoading ) && <Loading animated={ true } className='loading-renderer--card3d' /> }
        <Card.Background background={ cardBackgroundFront } content={ <canvas className='canvas-renderer-webgl' ref={ canvasRendererWebGL } /> } />
        <Card.Title title={ <a arial-label='email contact' className='card-face-link' href='mailto:iam@monsieurbadia.com'>monsieurbadia</a> } />
        <Card.Content content={ resultCardContentFront() } />
      </Card.Face>
      <Card.Face type='back'>
        <Card.Background background={ cardBackgroundBack } />
        <Card.Title title={ <span className='card-face-link'>experiences</span> } />
        <Card.Content content={
          <div>
            <ul className='card-face-list'>
              <li className='card-face-list-item'>
                <div className='name'>Sfeir</div>
                <div className='date'>Avril 2018 - Present</div>
                <div className='qualification'>Creative Coder</div>
              </li>
              <li className='card-face-list-item'>
                <div className='name'>Valtech</div>
                <div className='date'>Octobre 2016 - Avril 2018</div>
                <div className='qualification'>Frontend Developper</div>
              </li>
              <li className='card-face-list-item'>
                <div className='name'>Journey Agency</div>
                <div className='date'>Août 2015 - Octobre 2016</div>
                <div className='qualification'>Full Stack Developper</div>
              </li>
            </ul>
            <footer className='card-face-list-footer'>
                <a
                  aria-label='github'
                  className='icon icon-social icon-github'
                  href='https://github.com/monsieurbadia'
                  rel='noopener noreferrer'
                  target='_blank'>
                  <svg viewBox='0 0 578.305 578.305'>
                    <path fill='#B0935A' d='M533.32,160.379c0.532-26.518-5.294-53.33-10.024-79.731c-1.628-9.088-4.927-17.87-8.177-26.487 c-2.448-6.487-9.676-10.618-16.334-9.198c-4.309,0.918-8.183,1.812-11.94,3.048c-39.327,12.938-75.741,31.86-110.723,53.844 c-4.7,2.95-11.536,4.015-17.21,3.599c-13.574-0.992-27.001-4.37-40.569-5.013c-33.58-1.591-67.093-0.569-100.368,5.251 c-4.626,0.808-10.716,0.012-14.559-2.472C165.27,78.537,125.582,57.411,80.937,45.55c-6.702-1.781-13.599-0.838-15.294,1.824 c-1.035,1.628-1.971,3.317-2.485,5.128c-4.823,16.946-10.539,33.807-13.342,51.114c-3.341,20.655-6.554,41.935-4.969,62.565 c0.998,12.968-2.583,20.937-9.669,30.037C11.407,226.757,0.703,261.861,0.048,300.35c-0.563,32.919,3.794,65,13.819,96.47 c15.355,48.219,45.006,84.406,89.652,107.95c36.708,19.357,76.708,26.818,117.639,28.256c36.892,1.292,73.856,0.196,110.79,0.404 c37.021,0.208,73.532-3.091,108.948-14.633c35.447-11.549,66.121-30.184,89.922-59.486 c34.376-42.326,45.079-92.186,47.276-144.965c1.684-40.361-6.542-78.329-30.178-111.347 C538.332,189.603,532.959,178.097,533.32,160.379z M462.047,469.641c-15.876,13.728-35.288,20.227-55.16,24.976 c-38.99,9.315-78.69,11.635-118.519,9.896c-39.37,1.707-78.287-0.747-116.592-9.762c-28.256-6.646-54.052-17.821-72.032-42.075 c-28.611-38.599-35.924-112.057,11.353-152.148c12.056-10.221,25.502-16.708,41.39-17.717c17.534-1.12,35.074-3.305,52.595-3.097 c44.199,0.526,88.378,2.724,132.571,3.054c20.184,0.146,40.509-4.56,60.545-3.348c18.207,1.102,37.351,4.455,53.875,11.781 c27.546,12.215,42.374,36.983,46.854,65.992C505.597,400.326,496.796,439.586,462.047,469.641z'></path>
                    <ellipse cx='390.026' cy='385.552' rx='42.124' ry='56.298' fill='#f1c40f'></ellipse>
                    <ellipse cx='189.028' cy='385.552' rx='42.13' ry='56.298' fill='#f1c40f'></ellipse>
                  </svg>
                </a>
                <a
                  aria-label='codepen'
                  className='icon icon-social icon-codepen'
                  href='https://codepen.io/monsieurbadia'
                  rel='noopener noreferrer'
                  target='_blank'>
                  <svg
                    fill='none'
                    stroke='#f1c40f'
                    strokeWidth='2.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    viewBox='0 0 138 26'>
                    <path d='M15 8a7 7 0 1 0 0 10M22 9.3l11-7.3l11 7.3v7.4l-11 7.3l-11-7.3zm0 0l11 7.4l11-7.4m0 7.4l-11-7.4l-11 7.4m11-14.7v7.3m0 7.4v7.3M52 6h5a7 7 0 0 1 0 14h-5zM80 6h-9v14h9m-9-7h6M88 14h6a4 4 0 0 0 0-8h-6v14M114 6h-9v14h9m-9-7h6M122 20v-14l11 14v-14'></path>
                  </svg>
                </a>
                <a
                  aria-label='linkedin'
                  className='icon icon-social icon-linkedin'
                  href='https://linkedin.com/in/monsieurbadia'
                  rel='noopener noreferrer'
                  target='_blank'>
                  <svg viewBox='0 0 430.117 430.117'>
                    <path fill='#B0935A' d='M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707 c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21 v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824 C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463 c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z M5.477,420.56h92.184v-277.32H5.477V420.56z'></path>
                  </svg>
                </a>
              </footer>
          </div>
        } />
      </Card.Face>
    </Card>

  );

};
