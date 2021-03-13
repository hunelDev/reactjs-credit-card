import React from 'react';
import PropTypes from 'prop-types';

function Seperator({ children, classes, seperator }) {
  return (
    <span className={`${classes}${seperator ? ' seperator' : ''}`}>
      {children}
    </span>
  );
}

Seperator.defaultProps = {
  classes: '',
  seperator: true,
};

Seperator.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
  seperator: PropTypes.bool,
};
export default Seperator;
