import { WebGLRenderer } from 'three';

const CustomRendererWebGL = function CustomRendererWebGL ( canvas, { width, height, pixelRatio } ) {

  if ( !CustomRendererWebGL.instance ) {

    WebGLRenderer.call( this, {
      alpha: true,
      antialias: ( pixelRatio > 1 ) ? true : 1,
      canvas
    } );
 
    this.autoClear = false;
 
    this.setPixelRatio( ( pixelRatio > 2 ) ? 2 : pixelRatio );
    this.setSize( width, height );

    CustomRendererWebGL.instance = this;

  }

  return CustomRendererWebGL.instance;

};

CustomRendererWebGL.prototype = Object.create( WebGLRenderer.prototype );

CustomRendererWebGL.prototype = Object.assign( CustomRendererWebGL.prototype, {

  name: 'custom-renderer-webgl',

  setGamma: function setGamma ( isActive ) {

    this.gammaInput = isActive;
    this.gammaOutput = isActive;  
  
    return this;

  },

} );

export default CustomRendererWebGL;