import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// design
import './Notification.scss';

const Notification = ( props ) => {

  const {
    content,
    active
  } = props;

  const [ isActive, setIsActive ] = useState( active );
  const [ message, ] = useState( content || '' );

  const onClick = ( event ) => {

    event.preventDefault();
    event.stopPropagation();

    setIsActive( false );

  };

  return (

    <div className={ `notification-component ${ isActive ? 'notification-component--is-active' : '' }` }>
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

export default connect( null, null )( withRouter( Notification ) );
