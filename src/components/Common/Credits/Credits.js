import { useEffect, useRef } from 'react';

const WEBSITE = 'https://monsieurbadia.com';

const bros = [
  [ 'coding by @monsieurbadia', WEBSITE ]
];

const Credits = () => {

  const author = useRef( 'Bedroom Galaxy | coding by @monsieurbadia' );
  const website = useRef( WEBSITE );

  useEffect( () => {

    show();

  });

  const show = () => {

    if ( navigator.userAgent.toLowerCase().indexOf( 'chrome' ) > - 1 ) {

      for ( let index = bros.reverse().length - 1; index >= 0; index -- ) {

        const [ author, website ] = bros[ index ];

        const args = [
          `%c ${ author } %c ${ website }`,
          `color: #ffffff; background: #ff5c7c; padding: 3px 0;`,
          `padding: 3px 1px; color: #000000; text-decoration: none;`,
        ];

        console.log.apply( console, args );

      };
    
    } else if ( window.console ) {
    
      console.log( `${ author.current } ${ website.current } `);
    
    }
  
  }

  return null;

};

export default Credits;
