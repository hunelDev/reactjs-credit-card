import React from 'react';
import Seperator from '../../../seperator';
import PropTypes from 'prop-types';

function CardBottomLowestOwner({ cardOwner }) {
  let _cardOwner;
  if (cardOwner.length > 63) _cardOwner = `${cardOwner.slice(0, 63)}..`;

  return (
    <div className="owner">
      <Seperator>{_cardOwner || cardOwner || 'CARD HOLDER'}</Seperator>
    </div>
  );
}

CardBottomLowestOwner.defaultProps = {
  cardOwner: '',
};

CardBottomLowestOwner.propTypes = {
  cardOwner: PropTypes.string,
};

export default CardBottomLowestOwner;
