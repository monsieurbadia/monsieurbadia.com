import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import { withRouter } from 'react-router-dom'; 

// contexts

import { ContextNotification } from '../../Hook/context/context';

// components

import Card3D from '../../Layout/Card3D/Card3D';
import Loading from '../../Layout/Loading/Loading';
import Notification from '../../Layout/Notification/Notification';

// customs

import { useSceneManager } from '../../Hook/custom/custom';

export default withRouter( function Home () {

  const { state } = useContext( ContextNotification );

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

        <div className='home home-component'>
          <Notification
            isOpened={ state.isOpened }
            content='iam@monsieurbadia.com'
            email='iam@monsieurbadia.com' />
          <div className='scene scene-perspective'>
            <Card3D />
          </div>
        </div>

      ) }

    </>

  );

} );
