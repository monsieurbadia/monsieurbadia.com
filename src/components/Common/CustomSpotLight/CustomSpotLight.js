import { SpotLight, Vector3 } from 'three';

const CustomSpotLight = function CustomSpotLight () {

  SpotLight.call( this, 0xf1c40f, 1.0 );

  this.angle = 1.05;
  this.decacy = 2;
  this.penumbra = 1;

  this.position.set( 0, 200, 0 );

  this.castShadow = true;
  this.shadow.camera.near = 0.1;
  this.shadow.camera.far = 1000;
  this.shadow.camera.fov = 25;

  this.lookAt( new Vector3( 0, 0, 0 ) );

};

CustomSpotLight.prototype = Object.create( SpotLight.prototype );

CustomSpotLight.prototype = Object.assign( CustomSpotLight.prototype, {

  name: 'custom-spot-light',

  create: function create ( group ) {

    group.add( this );

  },

  render: function ( time ) {

    this.position.x = ( Math.sin( time * 0.01 ) * 100 );

  }
  
} );

export default CustomSpotLight;
