import React, {
  useContext
} from 'react';

// contexts

import { ContextNotification } from '../../Hook/context/context';

// design

import './Notification.sass';

export default function Notification ( { isOpened, content = '', email } ) {

  const { dispatchSetIsOpened } = useContext( ContextNotification );

  const onClick = ( event ) => {

    event.preventDefault();
    event.stopPropagation();

    dispatchSetIsOpened( false );

  };

  return (

    <div className={ `notification-component ${ ( isOpened ) ? 'notification-component--is-opened' : '' }` }>
      <div className='notification'>
          <div className='notification-column notification-column--left'>
            <a
              href={ `mailto:${ email }` }
              className='notification-column-message'>
              { content }
            </a>
          </div>
          <div className='notification-column notification-column--right'>
            <span onClick={ onClick } className='notification-icon notification-icon--cross' />
          </div>
      </div>
    </div>

  );

};
