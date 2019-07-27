import {
  PerspectiveCamera,
  Quaternion,
  Vector3
} from 'three';

  /** 
   * custom perspective camera class.
   * @constructor
   * @param {Number} fov - camera frustum vertical field of view. 
   * @param {Number} aspect — camera frustum aspect ratio.
   * @param {Number} near — camera frustum near plane.
   * @param {Number} far — camera frustum far plane. */

const CustomPerspectiveCamera = function CustomPerspectiveCamera ( fov, aspect, near, far ) {

  PerspectiveCamera.call( this, fov, aspect, near, far );

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

  name: 'custom-perspective-camera',

  render: function render ( time, target ) {

    const { motion, position } = this;

    motion.quaternion.setFromAxisAngle( motion.axis.x, ( motion.angle + ( time * 0.005 ) ) );
    motion.quaternion.setFromAxisAngle( motion.axis.y, ( motion.angle + ( time * 0.005 ) ) );
    motion.quaternion.setFromAxisAngle( motion.axis.z, ( motion.angle + ( time * 0.005 ) ) );

    position.applyQuaternion( motion.quaternion );

    this.lookAt( target.position );
    this.updateProjectionMatrix();

  }

} );

export default CustomPerspectiveCamera;
