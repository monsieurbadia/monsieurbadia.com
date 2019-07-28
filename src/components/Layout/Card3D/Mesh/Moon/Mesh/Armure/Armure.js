import {
  DoubleSide,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  RepeatWrapping,
  SphericalReflectionMapping,
} from 'three';

import SimplexNoise from 'simplex-noise';

// components
import { PromiseTextureLoader } from '../../../../../../Common/LoaderManager/LoaderManager';

// images
import envMapImage from '../../../../../../../assets/images/envMap.png';
import alphaMapImage from '../../../../../../../assets/images/alphaMap.png';

let _geometry;
let _material;
let _simplex = new SimplexNoise();

const Armure = function Armure () {

  _geometry = new IcosahedronGeometry( 10, 5 );
  _material = new MeshStandardMaterial( {
    alphaTest: 0.5,
    color: 0xfff,
    roughness: 0,
    metalness: 1.0,
    aoMapIntensity: 0.2,
    envMapIntensity: 1.0,
    displacementScale: 0.5,
    normalScale: 1.0,
    side: DoubleSide,
    transparent: true,
  } );

  Mesh.call( this, _geometry, _material );

  this.name = 'armure';

  this.castShadow = true;
  this.receiveShadow = false;

};

Armure.prototype = Object.create( Mesh.prototype );

Armure.prototype = Object.assign( Armure.prototype, {

  create: async function create ( group ) {

    const envMap = await PromiseTextureLoader( envMapImage );
    envMap.mapping = SphericalReflectionMapping;
  
    _material.envMap = envMap;

    const alphaMap = await PromiseTextureLoader( alphaMapImage );

    _material.alphaMap = alphaMap;
    _material.alphaMap.mapping = SphericalReflectionMapping;
    _material.alphaMap.magFilter = NearestFilter;
    _material.alphaMap.wrapT = RepeatWrapping;
    _material.roughnessMap = _material.alphaMap;
    _material.alphaMap.repeat.y = 2;
    _material.alphaMap.anisotropy = 1;

    group.add( this );

  },

  render: function render ( time ) {

    _material.alphaMap.offset.y += ( time * 0.2 );

    _geometry.vertices.forEach( ( vertex ) => {

      const time = Date.now();
      
      vertex.normalize();
      
      const distance = ( _geometry.parameters.radius + _simplex.noise3D(
        vertex.x + ( time * 0.000006 ),
        vertex.y + ( time * 0.00007 ),
        vertex.z + ( time * 0.00008 )
      ) * 2.5 );
      
      vertex.multiplyScalar( distance );
    
    } );

    _geometry.verticesNeedUpdate = true;
    _geometry.normalsNeedUpdate = true;
    _geometry.computeVertexNormals();
    _geometry.computeFaceNormals();

  }

} );

export default Armure;
