import React from 'react';

export default React.forwardRef(function CardBackFace({ children }, ref) {
  return (
    <div className="card-back-face" ref={ref}>
      {children}
    </div>
  );
});
