import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { withRouter } from 'react-router-dom'; 

// components
import Card3D from '../../Layout/Card3D/Card3D';

export default withRouter( function Home () {

  const timeoutID = useRef( null );

  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( () => {

    if ( isLoading === true ) {

      init();

    }

  } );

  useEffect( () => {

    return () => ( timeoutID.current !== null && isLoading ) && clear();

  }, [ timeoutID, isLoading ] );

  const onTimeout = async function onTimeout () {

    await setIsLoading( true );

  };

  const clear = function clear () {

    window.clearTimeout( timeoutID.current );

  };

  const init = function init () {

    timeoutID.current = window.setTimeout( onTimeout, 1000 );

  };

  return (

    <>

      { isLoading ? (

        <div className='loading-renderer-svg'>
          <svg
            className="monsieurbadia-logo-svg"
            preserveAspectRatio="xMaxYMid meet"
            width="200"
            height="200"
            style={ {
              'width': '200px',
              'height': '200px',
              'cursor': 'pointer',
              'userSelect': 'none'
            } }
            version='1.1'
            viewBox="0 0 800 850"
            xmlns="http://www.w3.org/2000/svg">
            <g className="monsieurbadia-logo-mister-no-face">
              <g className="monsieurbadia-logo-mister-no-face-body">
                <g className="monsieurbadia-logo-mister-no-face-body-neck">
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='442 444'
                    d="M338.6,407.2L339.7,486.4L400.1,543.4L457.5,486.4L457.5,407.2Z">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='443;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
                <g className="monsieurbadia-logo-mister-no-face-body-collar">
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='237 239'
                    d="M339.5,469.1L295.1,518.7L356.2,597.1L400.1,542.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='238;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='242 244'
                    d="M458,464.6L505.6,518.7L444.5,597.1L400.6,542.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='243;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='245 247'
                    d="M400.1,542.1L400.1,787.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='244;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
                <g className="monsieurbadia-logo-mister-no-face-body-left-hand">
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='332 334'
                    d="M295.1,518.7L195.9,565.4L205.9,787.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='333;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='252 254'
                    d="M218.7,554.7L277.5,637.4L277.5,787.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='253;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
                <g className="monsieurbadia-logo-mister-no-face-body-right-hand">
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='332 334'
                    d="M506,518.7L605.3,565.4L595.2,787.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='333;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='252 254'
                    d="M585,554.7L526.2,637.4L526.2,787.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='253;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
                <g className="monsieurbadia-logo-mister-no-face-body-pocket">
                  <path
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeDashoffset='0'
                    strokeDasharray='53 55'
                    d="M314.6,661.1L367.4,661.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='54;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                    <animate
                      id='stroke-dashoffset-opacity-0'
                      attributeName='opacity'
                      attributeType='XML'
                      values='1;1;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
              </g>
              <g className="monsieurbadia-logo-mister-no-face-body-head">
                <g className="monsieurbadia-logo-mister-no-face-body-head-structure">
                  <path
                    fill="#1d1d1b"
                    strokeDashoffset='0'
                    strokeDasharray='1046 1048'
                    d="M400.6,502.5L154.1,256.1L400.6,9.6L647,256.1">
                    <animate
                      id='stroke-dashoffset-0'
                      attributeName='stroke-dashoffset'
                      attributeType='XML'
                      values='1047;0;0'
                      begin='0ms'
                      dur='1000ms'
                      calcMode='linear'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
                <g className="monsieurbadia-logo-mister-no-face-body-head-eye">
                  <g className="monsieurbadia-logo-mister-no-face-body-head-eye-structure">
                    <path
                      fill="#ffffff"
                      stroke="#000000"
                      strokeMiterlimit="10"
                      strokeDashoffset='0'
                      strokeDasharray='437 439'
                      d="M400.6,211.4L300.9,253.5L400.6,300.7L500.2,253.5Z">
                      <animate
                        id='stroke-dashoffset-0'
                        attributeName='stroke-dashoffset'
                        attributeType='XML'
                        values='438;0;0'
                        begin='0ms'
                        dur='1000ms'
                        calcMode='linear'
                        repeatCount='indefinite'
                      />
                    </path>
                  </g>
                  <g className="monsieurbadia-logo-mister-no-face-body-head-eye-iris">
                    <path
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeDashoffset='0'
                      strokeDasharray='123 125'
                      d="M364.6,308c-17.1-11.6-28.4-31.2-28.4-53.4c0-21.2,10.2-40,26-51.7">
                      <animate
                        id='stroke-dashoffset-0'
                        attributeName='stroke-dashoffset'
                        attributeType='XML'
                        values='124;0;0'
                        begin='0ms'
                        dur='1000ms'
                        calcMode='linear'
                        repeatCount='indefinite'
                      />
                    </path>
                    <path
                      fill="none"
                      stroke="#1D1D1B"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeDashoffset='0'
                      strokeDasharray='120 122'
                      d="M443.7,206.8c13.1,11.8,21.3,28.8,21.3,47.8c0,23.1-12.1,43.3-30.4,54.7">
                      <animate
                        id='stroke-dashoffset-0'
                        attributeName='stroke-dashoffset'
                        attributeType='XML'
                        values='121;0;0'
                        begin='0ms'
                        dur='1000ms'
                        calcMode='linear'
                        repeatCount='indefinite'
                      />
                    </path>
                  </g>
                  <g className="monsieurbadia-logo-mister-no-face-body-head-eye-pupil">
                    <path
                      fill="#000000"
                      strokeDashoffset='0'
                      strokeDasharray='133 135'
                      d="M379.5,254.6A21.1,21.1 0,1,1 421.70000000000005,254.6A21.1,21.1 0,1,1 379.5,254.6">
                      <animate
                        id='stroke-dashoffset-0'
                        attributeName='stroke-dashoffset'
                        attributeType='XML'
                        values='134;0;0'
                        begin='0ms'
                        dur='1000ms'
                        calcMode='linear'
                        repeatCount='indefinite'
                      />
                    </path>
                    <g className="eye-pupil-glow">
                      <path
                        fill="#ffffff"
                        strokeDashoffset='0'
                        strokeDasharray='31 33'
                        d="M403.2,257.1A4.8,4.8 0,1,1 412.8,257.1A4.8,4.8 0,1,1 403.2,257.1">
                        <animate
                          id='stroke-dashoffset-0'
                          attributeName='stroke-dashoffset'
                          attributeType='XML'
                          values='32;0;0'
                          begin='0ms'
                          dur='1000ms'
                          calcMode='linear'
                          repeatCount='indefinite'
                        />
                      </path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g className='monsieurbadia-logo-mister-no-face-title'>
              <text
                x="50%"
                y="850"
                fill="#000000"
                style={ {
                  'fontFamily': 'sans-serif',
                  'fontSize': '50px',
                  'fontWeight': '400',
                  'textAnchor': 'middle',
                  'textTransform': 'uppercase',
                  'whiteSpace': 'pre-line',
                  'letterSpacing': '0px'
                } }>
                monsieurbadia
              </text>
            </g>
          </svg>
        </div>

      ) : (

        <div className='scene scene-perspective'>
          <Card3D />
        </div>

      ) }

    </>

  );

} );
