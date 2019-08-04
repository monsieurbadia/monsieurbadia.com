import {
  Color,
  Vector3
} from 'three';

export default {

  // color hexa
  hexa: {
    black: 0x000000,
    green: 0x041413,
    yellow: 0xf1c40f,
    white: 0xffffff
  },

  // color vec3
  vec3: {
    black: new Vector3( 0, 0, 0 ),
    white: new Vector3( 1.0, 1.0, 1.0 )
  },

  // color parse
  parse: ( hexa ) => {

    const color = new Color( hexa );

    color.convertSRGBToLinear();

    return color;
  }

};
