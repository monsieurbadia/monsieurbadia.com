import React from 'react';

// components
import LoadingRendererSVG from './LoadingRenderer/LoadingRendererSVG/LoadingRendererSVG';

export default function Loading ( { animated, className } ) {

  return ( <LoadingRendererSVG animated={ animated } className={ className } /> );

};
