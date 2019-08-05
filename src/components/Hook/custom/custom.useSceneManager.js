import {
  useContext,
  useEffect,
  useRef
} from 'react';

import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Group,
  PCFSoftShadowMap,
  Scene,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  KernelSize,
  RenderPass,
} from 'postprocessing';

// components

import Colors from '../../Common/Colors/Colors';
import CustomPerspectiveCamera from '../../Common/CustomPerspectiveCamera/CustomPerspectiveCamera';
import CustomRendererWebGL from '../../Common/CustomRendererWebGL/CustomRendererWebGL';
import CustomSpotLight from '../../Common/CustomSpotLight/CustomSpotLight';

// meshes

import Moon from '../../Layout/Card3D/Mesh/Moon/Moon';

// contexts

import { ContextCard3D } from '../context/context';

// custom current

export default function useSceneManager () {

  const { state: stateCard3D } = useContext( ContextCard3D );

  const moon = useRef( null );
  const timeoutID = useRef( null );
  
  let ambientLight;
  let bloomEffectRendererWebGL;
  let clock;
  let customPerspectiveCamera;
  let customRendererWebGL;
  let customSpotLight;
  let composerRendererWebGL ;
  let directionalLight;
  let effectPassRendererWebGL;
  let groupRendererWebGL;
  let orbitControls;
  let renderPassRendererWebGL;
  let sceneRendererWebGL;
  let timer;

  useEffect( () => {

    if ( moon.current !== null ) {
      
      timeoutID.current = window.setTimeout( () => moon.current.animated = stateCard3D.isFlipped, 250 );

    }

  } );

  // clears

  const clearTimeout = function clearTimeout ( timeoutID ) {

    window.clearTimeout( timeoutID );

  };

  const clearTimer = function clearTimer ( timer ) {

    timer.time = 0;

  };

  const clearRenderer = function clearRenderer () {

    stop();

  };

  // creates

  const createCamera = function createCamera ( { width, height } ) {

    const fov = 25;
    const aspect = ( width / height );
    const near = 0.1;
    const far = 250;

    customPerspectiveCamera = new CustomPerspectiveCamera( { fov, aspect, near, far } );
    customPerspectiveCamera.position.set( 0, 15, 100 );

    return customPerspectiveCamera;

  };

  const createControls = function createControls ( camera ) {

    orbitControls = new OrbitControls( camera );
    orbitControls.enabled = false;
    orbitControls.enableRotate = true;
    orbitControls.enableZoom = true;
    orbitControls.rotateSpeed = 1.0;
    orbitControls.zoomSpeed = 1.2;
    orbitControls.panSpeed = 0.8;

  };

  const createRendererEffect = function createRendererEffect ( { scene, width, height } ) {

    bloomEffectRendererWebGL = new BloomEffect( {
			blendFunction: BlendFunction.SCREEN,
      distinction: 3.0,
			kernelSize: KernelSize.MEDIUM,
			resolutionScale: 0.5
    } );

    bloomEffectRendererWebGL.blendMode.opacity.value = 2.3;
    bloomEffectRendererWebGL.threshold = 0.21;
    bloomEffectRendererWebGL.strength = 1.2;
    bloomEffectRendererWebGL.radius = 0.55;

    composerRendererWebGL = new EffectComposer( customRendererWebGL );

    renderPassRendererWebGL = new RenderPass( scene, customPerspectiveCamera );

    effectPassRendererWebGL = new EffectPass( customPerspectiveCamera, bloomEffectRendererWebGL );

    effectPassRendererWebGL.renderToScreen = true;

    composerRendererWebGL.setSize( width, height );
    composerRendererWebGL.addPass( renderPassRendererWebGL );
    composerRendererWebGL.addPass( effectPassRendererWebGL );

    return composerRendererWebGL;

  };

  const createGroup = function createGroup () {

    groupRendererWebGL = new Group();

    return groupRendererWebGL;

  };

  const createLights = async function createLights ( group ) {

    ambientLight = new AmbientLight( Colors.hexa.white, 0.25 );
    customSpotLight = new CustomSpotLight();
    directionalLight = new DirectionalLight( Colors.hexa.white, 0.75 );

    directionalLight.position.setScalar( 100 );

    await customSpotLight.create( group );

    group.add( ambientLight );
    group.add( directionalLight );   

  };

  const createMeshes = async function createMeshes ( group ) {

    moon.current = new Moon();

    await moon.current.create( group );

  };

  const createRenderer = function createRenderer ( { canvas, width, height, pixelRatio } ) {

    customRendererWebGL = new CustomRendererWebGL( { canvas, width, height, pixelRatio } );
    customRendererWebGL.shadowMap.enabled = true;
    customRendererWebGL.shadowMap.type = PCFSoftShadowMap;
    customRendererWebGL.toneMappingExposure = Math.pow( 0.95, 4.0 );
    customRendererWebGL.setClearColor( Colors.hexa.green, 1.0 );
    customRendererWebGL.setGamma( true );

    return customRendererWebGL;

  };

  const createScene = function createScene ( group ) {

    sceneRendererWebGL = new Scene();
    sceneRendererWebGL.background = Colors.hexa.green;

    sceneRendererWebGL.add( group );

    return sceneRendererWebGL;

  };

  const createClock = function createClock () {

    clock = new Clock( false );

    return clock;

  };

  const createTimer = function createTimer ( { time = 0, duration = 10 } ) {

    timer = { time, duration };

    return clock;

  };

  // renders

  const render = function render () {

    const time = clock.getDelta();

    clock.start();

    timer.time += time;

    customSpotLight.render( time );
    moon.current.render( time );

    composerRendererWebGL.render( time );

    renderLoop();

  };

  const renderLoop = function renderLoop () {

    start();

  };

  // events

  const resize = function resize () { console.log( 'resize' ) };

  // controls

  const start = function start () {

    composerRendererWebGL.renderer.setAnimationLoop( render );

  };

  const stop = function stop () {

    composerRendererWebGL.renderer.setAnimationLoop( null );

  };

  return ( {
    clearRenderer,
    clearTimeout,
    clearTimer,
    createCamera,
    createClock,
    createControls,
    createGroup,
    createRendererEffect,
    createLights,
    createMeshes,
    createRenderer,
    createScene,
    createTimer,
    render,
    renderLoop,
    resize,
    children: []
  } );

};