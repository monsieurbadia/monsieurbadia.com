import React, {
  useEffect,
  useState
} from 'react';

import { withRouter } from 'react-router-dom'; 

// components

import Card3D from '../../Layout/Card3D/Card3D';
import Loading from '../../Layout/Loading/Loading';

// hooks

import { useSceneManager } from '../../Hook/custom/custom';

export default withRouter( function Home () {

  const [ isLoading, setIsLoading ] = useState( true );

  const sceneManager = useSceneManager();

  let timeoutID;

  useEffect( () => {

    if ( isLoading === true ) {

      init();

    }

  } );

  useEffect( () => {

    return () => ( timeoutID !== undefined && isLoading ) && clear();

  } );

  const onTimeout = function onTimeout () {

    setIsLoading( false );

  };

  const clear = function clear () {

    sceneManager.clearTimeout( timeoutID );

  };

  const init = function init () {

    timeoutID = window.setTimeout( onTimeout, 2000 );

  };

  return (

    <>

      { isLoading ? (

        <Loading content={ true } />

      ) : (

        <div className='scene scene-perspective'>
          <Card3D />
        </div>

      ) }

    </>

  );

} );
