import {
  Mesh,
  PlaneGeometry,
  ShadowMaterial
} from 'three';

const Shadow = function Shadow () {

  const _geometry = new PlaneGeometry( 50, 50, 20, 20 );
  const _material = new ShadowMaterial( { opacity: 0.8 } );

  Mesh.call( this, _geometry, _material );

  this.name = 'shadow';

  this.castShadow = false;
  this.receiveShadow = true;

  this.rotation.x = ( - 0.5 * Math.PI );
  this.position.y = - 16;

};

Shadow.prototype = Object.create( Mesh.prototype );

Shadow.prototype = Object.assign( Shadow.prototype, {

  create: function create ( group ) {

    group.add( this );

  }

} );

export default Shadow;
