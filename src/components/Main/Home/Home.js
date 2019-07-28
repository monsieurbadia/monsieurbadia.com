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

    await setIsLoading( false );

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

        <div className='loading-renderer-html'>

          <h1 className='loading-renderer-html-title'>
            <div className='loading-renderer-html-title-slot'>monsieurbadia</div>
          </h1>

          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            width="100"
            viewBox="0 200 845 425"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M4 579l82 0 251 -333 130 170 84 -111 210 274 82 0 0 22 -839 0 0 -22zm109 0l354 0 -134 -291 -220 291zm378 0l74 0 -186 -243 112 243zm101 0l61 0 -107 -232 -65 87 111 145zm85 0l56 0 -140 -184 84 184z" />
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
