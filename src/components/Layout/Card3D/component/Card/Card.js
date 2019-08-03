import React from 'react';

// design
import './Card.sass';

const Card = ( {
  card,
  children,
  className = 'card card-component',
  onClick
} ) => (

  <div
    className={ className }
    ref={ card }
    onClick={ onClick }>
    { children }
  </div>

);

const Background = ( {
  background,
  template
} ) => (

  <div
    className='card-face-background'
    ref={ background }>
    { template }
  </div>

);

const Face = ( {
  children,
  type = 'front'
} ) => (

  <div className={ `card-face card-face--${ type }` }>
    { children }
  </div>

);

const Title = ( { title } ) => (

  <div className='card-face-title'>
    <div className='card-face-title-wrapper'>
      <svg
        className='icon icon--bubble icon--top'
        viewBox='0 15 100 100'
        xmlns='http://www.w3.org/2000/svg'>
        <polygon points='45.454,16.378 11.119,16.378 11.119,50.713 29.547,77.188 42.673,67.431 31.152,50.713 45.454,50.713'></polygon>
        <polygon points='87.528,16.378 53.192,16.378 53.192,50.713 71.621,77.188 84.747,67.431 73.226,50.713 87.528,50.713'></polygon>
      </svg>
      { title }
      <svg
        className='icon icon--bubble icon--bottom'
        viewBox='0 15 100 100'
        xmlns='http://www.w3.org/2000/svg'>
        <polygon points='45.454,16.378 11.119,16.378 11.119,50.713 29.547,77.188 42.673,67.431 31.152,50.713 45.454,50.713'></polygon>
        <polygon points='87.528,16.378 53.192,16.378 53.192,50.713 71.621,77.188 84.747,67.431 73.226,50.713 87.528,50.713'></polygon>
      </svg>
    </div>
  </div>

);

const Content = ( { template } ) => (

  <div className='card-face-content'>
    { template }
  </div>

);

Card.Background = Background;
Card.Face = Face;
Card.Title = Title;
Card.Content = Content;

export default Card;
