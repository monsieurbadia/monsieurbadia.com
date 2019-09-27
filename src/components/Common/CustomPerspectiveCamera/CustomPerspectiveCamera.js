import {
  PerspectiveCamera,
  Quaternion,
  Vector3
} from 'three';

  /** 
   * custom perspective camera class.
   * @constructor
   * @extends { Object } - instance of PerspectiveCamera
   * @param {Number} fov - camera frustum vertical field of view. 
   * @param {Number} aspect — camera frustum aspect ratio.
   * @param {Number} near — camera frustum near plane.
   * @param {Number} far — camera frustum far plane.
   * @param { Object } - instance of CustomPerspectiveCamera
   */ 

  export default function CustomPerspectiveCamera ( { fov, aspect, near, far } ) {

  PerspectiveCamera.call( this, fov, aspect, near, far );

  this.name = 'custom-perspective-camera';

  this.motion = {
    angle: 0.005,
    axis: new Vector3(
      new Vector3( 1, 0, 0 ).normalize(),
      new Vector3( 0, 1, 0 ).normalize(),
      new Vector3( 0, 0, 1 ).normalize()
    ),
    quaternion: new Quaternion()
  };

};

CustomPerspectiveCamera.prototype = Object.create( PerspectiveCamera.prototype );

CustomPerspectiveCamera.prototype = Object.assign( CustomPerspectiveCamera.prototype, {

  render: function render ( time, { position } ) {

    this.motion.quaternion.setFromAxisAngle( this.motion.axis.x, ( this.motion.angle + ( time * 0.005 ) ) );
    this.motion.quaternion.setFromAxisAngle( this.motion.axis.y, ( this.motion.angle + ( time * 0.005 ) ) );
    this.motion.quaternion.setFromAxisAngle( this.motion.axis.z, ( this.motion.angle + ( time * 0.005 ) ) );

    this.position.applyQuaternion( this.motion.quaternion );

    this.lookAt( position );
    this.updateProjectionMatrix();

  }

} );
