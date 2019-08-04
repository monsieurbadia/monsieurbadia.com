import {
  IcosahedronBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry
} from 'three';

// components

import Colors from '../../../../../../Common/Colors/Colors';

// global

let _geometryIcosahedron;
let _geometryOctahedron;
let _materialMesh;

export default function Sphere () {

  _geometryIcosahedron = new IcosahedronBufferGeometry( 7.8, 5 );
  _geometryOctahedron = new OctahedronGeometry( 9, 0 );

  _materialMesh = new MeshBasicMaterial( { color: Colors.parse( Colors.hexa.white ) } );

  const _geometry = _geometryIcosahedron;
  const _material = _materialMesh;

  Mesh.call( this, _geometry, _material );

  this.name = 'sphere';

  this.matrixAutoUpdate = false;

  this.position.set( 0, 0, 0 );

};

Sphere.prototype = Object.create( Mesh.prototype );

Sphere.prototype = Object.assign( Sphere.prototype, {

  create: function create ( group ) {

    group.add( this );

  },

  render: function render ( isTransformed = false ) {

    const geometry = ( isTransformed ) ? _geometryOctahedron : _geometryIcosahedron; 

    this.geometry = geometry;

  }

} );
