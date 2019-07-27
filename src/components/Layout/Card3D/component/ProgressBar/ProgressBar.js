import React, {
  useEffect,
  useRef
} from 'react';

import anime from 'animejs';

// design
import './ProgressBar.scss';

// progress bar
export default ( props ) => {

  const { timer } = props;

  const progressBar = useRef( null );

  const motion = {
    anime: anime,
    show: {
      duration: 0,
      easing: 'linear',
      setScaleX: ( scaleX ) => `${ scaleX }`,
    }
  };

  useEffect( () => {

    if ( timer.current.time > 0 ) {

      init( timer.current.time );
    
    }

  }, [ timer ] );

  const init = ( time ) => {

    const currentTime = ( time / timer.current.duration );

    motion.anime( {
      targets: progressBar.current,
      duration: motion.show.duration,
      scaleX: motion.show.setScaleX( currentTime ),
      easing: motion.show.easing
    } );

  };

  return (

    <div className='progress-bar-component'>
      <div ref={ progressBar } className='progress-bar'></div>
    </div>

  );

};
