import React from 'react';

export default React.forwardRef(function CardFrontFace(
  { children, cardFace },
  ref
) {
  return (
    <div
      className={`card-front-face${cardFace === 2 ? ' init' : ''}`}
      ref={ref}
    >
      {children}
    </div>
  );
});
