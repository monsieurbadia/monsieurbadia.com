import React from 'react';

import PropTypes from 'prop-types';

// components

import LoadingRendererSVG from './LoadingRenderer/LoadingRendererSVG/LoadingRendererSVG';

export default function Loading ( {
  animated,
  className,
  content
} ) {

  return (

    <LoadingRendererSVG
      animated={ animated }
      className={ className }
      content={ content }
    />

  );

};

Loading.propTypes = {
  /** @type { bool } If true, the svg should be animated */
  animated: PropTypes.bool,
  /** @type { string } this set class name */
  className: PropTypes.string,
  /** @type { bool } If true, the content should be displayed */
  content: PropTypes.bool
};
