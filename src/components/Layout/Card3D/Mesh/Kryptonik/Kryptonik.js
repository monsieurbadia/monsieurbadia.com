import { Object3D, Vector3 } from 'three';

// meshes
import Armure from './Mesh/Armure/Armure';
import Shadow from './Mesh/Shadow/Shadow';
import Sphere from './Mesh/Sphere/Sphere';

let _armure;
let _shadow;
let _sphere;

const Kryptonik = function Kryptonik () {

  _armure = new Armure();
  _shadow = new Shadow();
  _sphere = new Sphere();

  Object3D.call( this );

  this.name = 'moon';

  this.position.copy( new Vector3( 0, 0, 0 ) );
  
  this.add( _armure, _shadow ,_sphere );

};

Kryptonik.prototype = Object.create( Object3D.prototype );

Kryptonik.prototype = Object.assign( Kryptonik.prototype, {

  create: function create ( group ) {

    group.add( this );

  },

  render: function render ( time, isFlipped ) {

    _armure.render( time );
    _sphere.render( isFlipped );

  }

} );

export default Kryptonik;
