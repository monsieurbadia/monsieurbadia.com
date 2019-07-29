import React from 'react';

// components
import LoadingRendererSVG from './LoadingRenderer/LoadingRendererSVG/LoadingRendererSVG';

export default function Loading ( props ) {

  const { animated, className } = props;

  return ( <LoadingRendererSVG animated={ animated } className={ className } /> );

};
