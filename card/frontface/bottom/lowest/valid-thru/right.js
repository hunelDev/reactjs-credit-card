import React from 'react';
import Seperator from '../../../../seperator';

export default function CardBottomLowestValidThruRight({
  cardValidMonth,
  cardValidYear,
}) {
  const yearFormat = cardValidYear.toString().slice(2, 4);
  const monthFormat =
    cardValidMonth < 10 ? `0${cardValidMonth}` : cardValidMonth;

  return (
    <div className="valid-thru-right">
      <div className="thru">
        <Seperator classes="seperator-owner">{monthFormat}</Seperator>
        <Seperator classes="seperator-owner">/</Seperator>
        <Seperator classes="seperator-owner">{yearFormat}</Seperator>
      </div>
    </div>
  );
}
