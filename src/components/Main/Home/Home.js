import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { withRouter } from 'react-router-dom'; 

// components

import Card3D from '../../Layout/Card3D/Card3D';
import Loading from '../../Common/Loading/Loading';

// hooks

import {
  ProviderCard3D,
  ProviderScene
} from '../../Layout/Card3D/Hook/provider/provider';

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

  } );

  const onTimeout = function onTimeout () {

    setIsLoading( false );

  };

  const clear = function clear () {

    window.clearTimeout( timeoutID.current );

  };

  const init = function init () {

    timeoutID.current = window.setTimeout( onTimeout, 2000 );

  };

  return (

    <>

      { isLoading ? (

        <Loading />

      ) : (

        <div className='scene scene-perspective'>
          <ProviderScene>
            <ProviderCard3D>
              <Card3D />
            </ProviderCard3D>
          </ProviderScene>
        </div>

      ) }

    </>

  );

} );
