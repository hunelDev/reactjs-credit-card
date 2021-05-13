import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { DetectCardNumberType } from '../../../../utils/general';

const Visa = lazy(() => import('./brands/visa'));

const Mastercard = lazy(() => import('./brands/mastercard'));
const Amex = lazy(() => import('./brands/amex'));
const Discover = lazy(() => import('./brands/discover'));

const brands = [<div></div>, <Visa />, <Mastercard />, <Amex />, <Discover />];

function CardBrand({ cardNumber }) {
  const cardType = DetectCardNumberType(cardNumber);

  return (
    <div className="card-brand">
      <div className="card-type">
        <Suspense fallback={<div></div>}>{brands[cardType]}</Suspense>
      </div>
    </div>
  );
}

CardBrand.propTypes = {
  entityType: PropTypes.string,
};

export default CardBrand;
