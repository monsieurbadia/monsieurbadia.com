import { TextureLoader } from 'three';

/**
 * @name PromiseTextureLoader
 * to preload texture image source with a three texture loader 
 * @param {String} hrefURL - desc
 */

export function PromiseTextureLoader ( hrefURL = '' ) {

  return new Promise( ( resolve, reject ) => {

    const textureLoader = new TextureLoader();
    textureLoader.load( hrefURL, resolve, undefined, reject );

  } );

};
