import {
  // AdditiveBlending,
  // Color,
  // LineBasicMaterial,
  IcosahedronBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry
} from 'three';

let _geometryIcosahedron;
let _geometryOctahedron;
// let _materialLine;
let _materialMesh;

const Sphere = function Sphere () {

  _geometryIcosahedron = new IcosahedronBufferGeometry( 7.8, 5 );
  _geometryOctahedron = new OctahedronGeometry( 9, 0 );

  // _materialLine = new LineBasicMaterial( {
  //   color: 0x009100,
  //   blending: AdditiveBlending,
  //   flatShading: true,
  //   opacity: 0.10,
  //   transparent: true,
  // } );

  _materialMesh = new MeshBasicMaterial( { color: 0xffffff } );

  const _geometry = _geometryIcosahedron;
  const _material = _materialMesh;

  Mesh.call( this, _geometry, _material );

  this.name = 'sphere';

  this.position.set( 0, 0, 0 );

};

Sphere.prototype = Object.create( Mesh.prototype );

Sphere.prototype = Object.assign( Sphere.prototype, {

  render: function render ( isTransformed = false ) {

    // const color = ( isTransformed ) ? new Color( 0x00ff00 ) : new Color( 0xffffff );
    const geometry = ( isTransformed ) ? _geometryOctahedron : _geometryIcosahedron; 
    // const material = ( isTransformed ) ? _materialLine : _materialMesh;

    this.geometry = geometry;
    // this.material = material;

    // this.material.color.set( color );

  }

} );

export default Sphere;
