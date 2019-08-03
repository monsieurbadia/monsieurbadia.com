import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { withRouter } from 'react-router-dom'; 

// components
import Card3D from '../../Layout/Card3D/Card3D';
import Loading from '../../Common/Loading/Loading';

import Card3DProvider from '../../Layout/Card3D/Reducer/reducer.card3D';

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

    timeoutID.current = window.setTimeout( onTimeout, 2000 );

  };

  return (

    <>

      { isLoading ? (

        <Loading />

      ) : (

        <div className='scene scene-perspective'>
          <Card3DProvider>
            <Card3D />
          </Card3DProvider>
        </div>

      ) }

    </>

  );

} );
