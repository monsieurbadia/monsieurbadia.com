import React, {
  useContext,
  useEffect,
  useRef
} from 'react';

import anime from 'animejs';

// contexts

import {
  ContextCard3D,
  ContextScene
} from '../context/context';

// customs

import useSceneManager from './custom.useSceneManager';

// custom current

export default function useCard3DManager ( { data: { experiences, skills, socials } } ) {

  const { state:stateCard3D } = useContext( ContextCard3D );
  const { state:stateScene } = useContext( ContextScene );

  const timeoutID = useRef( null );

  const sceneManager = useSceneManager();

  useEffect( () => {

    const { isFlipped } = stateCard3D;
    const { setup } = stateScene;

    flip( isFlipped, setup );

  } );

  const onFlip = ( isFlipped, { camera, canvas, card } ) => {

    if ( card.face.back !== null ) {

      const { position } = camera;

      switch ( isFlipped ) {

        case true :

          card.face.back.appendChild( canvas );

          anime( {
            targets: position,
            z: 150,
            round: 1,
            delay: 150,
            duration: 300,
            easing: 'easeInQuad'
          } );

          break;

        case false :

          card.face.front.appendChild( canvas );

          anime( {
            targets: position,
            z: 100,
            round: 1,
            delay: 150,
            duration: 300,
            easing: 'easeOutQuad'
          } );

          break;

        default :

          return null;

      }

    }

  };

  const flip = async ( isFlipped, setup ) => {

    sceneManager.clearTimeout( timeoutID.current );

    timeoutID.current = window.setTimeout( () => onFlip( isFlipped, setup ), 250 );

  };

  const setTemplateSkills = () => {

    const templateList = skills.map( ( { id, hashtag } ) => {

      return (

        <li key={ id } className='card-face-list-item'>{ hashtag }</li>

      );

    } );

    return (

      <div>
        <h3 className='card-face-list-title'>creative coder</h3>
        <ul className='card-face-list'>
          { templateList }
        </ul>
      </div>

    );

  };

  const setTemplateExperience = () => {

    const contentList = experiences.map( ( { id, date, name, qualification } ) => {

      return (

        <li key={ id } className='card-face-list-item'>
          <div className='name'>{ name }</div>
          <div className='date'>{ date }</div>
          <div className='qualification'>{ qualification }</div>
        </li>

      );

    } );

    const contentFooter = socials.map( ( { id, hrefURL, name } ) => {

      return (

        <a
          aria-label={ name }
          className={ `card-face-icon icon icon-social icon-${ name }` }
          href={ hrefURL }
          key={ id }
          rel='noopener noreferrer'
          target='_blank'>
          { setTemplateSocialsLogo( name ) }
        </a>

      );

    } );

    return (

      <div>
        <ul className='card-face-list'>
          { contentList }
        </ul>
        <footer className='card-face-footer'>
          { contentFooter }
        </footer>
      </div>

    );

  };

  const setTemplateSocialsLogo = ( name ) => {

    switch ( name ) {

      case 'codepen' :

        return (

          <svg
            fill='none'
            stroke='#f1c40f'
            strokeWidth='2.3'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 138 26'>
            <path d='M15 8a7 7 0 1 0 0 10M22 9.3l11-7.3l11 7.3v7.4l-11 7.3l-11-7.3zm0 0l11 7.4l11-7.4m0 7.4l-11-7.4l-11 7.4m11-14.7v7.3m0 7.4v7.3M52 6h5a7 7 0 0 1 0 14h-5zM80 6h-9v14h9m-9-7h6M88 14h6a4 4 0 0 0 0-8h-6v14M114 6h-9v14h9m-9-7h6M122 20v-14l11 14v-14'></path>
          </svg>

        );

      case 'github' :

        return (

          <svg viewBox='0 0 578.305 578.305'>
            <path fill='#B0935A' d='M533.32,160.379c0.532-26.518-5.294-53.33-10.024-79.731c-1.628-9.088-4.927-17.87-8.177-26.487 c-2.448-6.487-9.676-10.618-16.334-9.198c-4.309,0.918-8.183,1.812-11.94,3.048c-39.327,12.938-75.741,31.86-110.723,53.844 c-4.7,2.95-11.536,4.015-17.21,3.599c-13.574-0.992-27.001-4.37-40.569-5.013c-33.58-1.591-67.093-0.569-100.368,5.251 c-4.626,0.808-10.716,0.012-14.559-2.472C165.27,78.537,125.582,57.411,80.937,45.55c-6.702-1.781-13.599-0.838-15.294,1.824 c-1.035,1.628-1.971,3.317-2.485,5.128c-4.823,16.946-10.539,33.807-13.342,51.114c-3.341,20.655-6.554,41.935-4.969,62.565 c0.998,12.968-2.583,20.937-9.669,30.037C11.407,226.757,0.703,261.861,0.048,300.35c-0.563,32.919,3.794,65,13.819,96.47 c15.355,48.219,45.006,84.406,89.652,107.95c36.708,19.357,76.708,26.818,117.639,28.256c36.892,1.292,73.856,0.196,110.79,0.404 c37.021,0.208,73.532-3.091,108.948-14.633c35.447-11.549,66.121-30.184,89.922-59.486 c34.376-42.326,45.079-92.186,47.276-144.965c1.684-40.361-6.542-78.329-30.178-111.347 C538.332,189.603,532.959,178.097,533.32,160.379z M462.047,469.641c-15.876,13.728-35.288,20.227-55.16,24.976 c-38.99,9.315-78.69,11.635-118.519,9.896c-39.37,1.707-78.287-0.747-116.592-9.762c-28.256-6.646-54.052-17.821-72.032-42.075 c-28.611-38.599-35.924-112.057,11.353-152.148c12.056-10.221,25.502-16.708,41.39-17.717c17.534-1.12,35.074-3.305,52.595-3.097 c44.199,0.526,88.378,2.724,132.571,3.054c20.184,0.146,40.509-4.56,60.545-3.348c18.207,1.102,37.351,4.455,53.875,11.781 c27.546,12.215,42.374,36.983,46.854,65.992C505.597,400.326,496.796,439.586,462.047,469.641z'></path>
            <ellipse cx='390.026' cy='385.552' rx='42.124' ry='56.298' fill='#f1c40f'></ellipse>
            <ellipse cx='189.028' cy='385.552' rx='42.13' ry='56.298' fill='#f1c40f'></ellipse>
          </svg>

        );

      case 'linkedin' :

        return (

          <svg viewBox='0 0 430.117 430.117'>
            <path fill='#B0935A' d='M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707 c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21 v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824 C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463 c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z M5.477,420.56h92.184v-277.32H5.477V420.56z'></path>
          </svg>

        );

      default :

        return ( undefined );

    }

  };

  return ( {
    flip,
    // setters
    setTemplateSkills,
    setTemplateExperience,
    setTemplateSocialsLogo
  } );

};
