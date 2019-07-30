import { useRef } from 'react';

import {
  AmbientLight,
  DirectionalLight,
  PCFSoftShadowMap,
  Scene
} from 'three';

import OrbitControls from 'three-orbitcontrols';

import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  KernelSize,
  RenderPass,
} from 'postprocessing';

// components
import Colors from '../../../Common/Colors/Colors';
import CustomPerspectiveCamera from '../../../Common/CustomPerspectiveCamera/CustomPerspectiveCamera';
import CustomRendererWebGL from '../../../Common/CustomRendererWebGL/CustomRendererWebGL';
import CustomSpotLight from '../../../Common/CustomSpotLight/CustomSpotLight';
import Moon from '../Mesh/Moon/Moon';

export default function useSceneManager () {
  
  const ambientLight = useRef( null );
  const bloomEffectRendererWebGL = useRef( null );
  const customPerspectiveCamera = useRef( null );
  const customRendererWebGL = useRef( null );
  const customSpotLight = useRef( null );
  const composerRendererWebGL =  useRef( null );
  const directionalLight = useRef( null );
  const effectPassRendererWebGL = useRef( null );
  const moon = useRef( null );
  const orbitControls = useRef( null );
  const renderPassRendererWebGL = useRef( null );
  const sceneRendererWebGL = useRef( null );

  const createCamera = function createCamera ( width, height ) {

    customPerspectiveCamera.current = new CustomPerspectiveCamera( 25, ( width / height ), 0.1, 250 );
    customPerspectiveCamera.current.position.set( 0, 15, 100 );

    return customPerspectiveCamera.current;

  };

  const createControls = function createControls ( camera ) {

    orbitControls.current = new OrbitControls( camera );
    orbitControls.current.enabled = false;
    orbitControls.current.enableRotate = true;
    orbitControls.current.enableZoom = true;
    orbitControls.current.rotateSpeed = 1.0;
    orbitControls.current.zoomSpeed = 1.2;
    orbitControls.current.panSpeed = 0.8;

  };

  const createRendererEffect = function createRendererEffect ( scene, width, height ) {

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

    renderPassRendererWebGL.current = new RenderPass( scene, customPerspectiveCamera.current );

    effectPassRendererWebGL.current = new EffectPass( customPerspectiveCamera.current, bloomEffectRendererWebGL.current );

    effectPassRendererWebGL.current.renderToScreen = true;

    composerRendererWebGL.current.setSize( width, height );
    composerRendererWebGL.current.addPass( renderPassRendererWebGL.current );
    composerRendererWebGL.current.addPass( effectPassRendererWebGL.current );

    return composerRendererWebGL.current;

  };

  const createLights = async function createLights ( group ) {

    ambientLight.current = new AmbientLight( Colors.hexa.white, 0.25 );
    customSpotLight.current = new CustomSpotLight();
    directionalLight.current = new DirectionalLight( Colors.hexa.white, 0.75 );
    directionalLight.current.position.setScalar( 100 );

    await customSpotLight.current.create( group );

    group.add( ambientLight.current );
    group.add( directionalLight.current );   
  
  };

  const createMeshes = async function createMeshes ( group ) {

    moon.current = new Moon();

    await moon.current.create( group );

  };

  const createRenderer = function createRenderer ( canvasRendererWebGL, width, height, pixelRatio ) {

    customRendererWebGL.current = new CustomRendererWebGL( canvasRendererWebGL, { width, height, pixelRatio } );
    customRendererWebGL.current.shadowMap.enabled = true;
    customRendererWebGL.current.shadowMap.type = PCFSoftShadowMap;
    customRendererWebGL.current.toneMappingExposure = Math.pow( 0.95, 4.0 );
    customRendererWebGL.current.setClearColor( Colors.hexa.green, 1.0 );
    customRendererWebGL.current.setGamma( true );

    return customRendererWebGL.current;

  };

  const createScene = function createScene ( group ) {

    sceneRendererWebGL.current = new Scene();

    sceneRendererWebGL.current.add( group );

    return sceneRendererWebGL.current;

  };

  const resize = function resize () { console.log( 'resize' ) };

  return ( {
    composer: composerRendererWebGL.current,
    createCamera,
    createControls,
    createRendererEffect,
    createLights,
    createMeshes,
    createRenderer,
    createScene,
    resize,
    children: {
      customSpotLight,
      moon
    }
  } );

};