import {
  Object3D,
  Vector3
} from 'three';

// meshes

import Armure from './Mesh/Armure/Armure';
import Shadow from './Mesh/Shadow/Shadow';
import Sphere from './Mesh/Sphere/Sphere';

// global

let _armure;
let _shadow;
let _sphere;
let _start;

export default function Moon () {

  _armure = new Armure();
  _shadow = new Shadow();
  _sphere = new Sphere();

  _start = Date.now();

  Object3D.call( this );

  this.name = 'moon';

  this.animated = false;
  this.position.copy( new Vector3( 0, 0, 0 ) );
  
};

Moon.prototype = Object.create( Object3D.prototype );

Moon.prototype = Object.assign( Moon.prototype, {

  create: function create ( group ) {

    _armure.create( this );
    _shadow.create( this );
    _sphere.create( this );

    group.add( this );

  },

  render: function render ( time ) {

    const timer = ( Date.now() - _start );

    _armure.render( time );
    _sphere.render( this.animated );

    this.position.y = ( Math.abs( Math.sin( timer * 0.00025 ) ) * 2.5 );

  }

} );
