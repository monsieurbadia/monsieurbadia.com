import React, {
  useContext,
  useState
} from 'react';

// context

import { ContextNotification } from '../../Hook/context/context';

// design

import './Notification.sass';

export default function Notification ( { content } ) {

  const { state, dispatchSetIsOpened } = useContext( ContextNotification );

  const [ message, ] = useState( content || '' );

  const onClick = ( event ) => {

    event.preventDefault();
    event.stopPropagation();

    dispatchSetIsOpened( false );

  };

  return (

    <div className={ `notification-component ${ state.isOpened ? 'notification-component--is-opened' : '' }` }>
      <div className='notification'>
          <div className='notification-column notification-column--left'>
            <span className='notification-column-message'>{ message }</span>
          </div>
          <div className='notification-column notification-column--right'>
            <span onClick={ onClick } className='notification-icon notification-icon--cross' />
          </div>
      </div>
    </div>

  );

};
