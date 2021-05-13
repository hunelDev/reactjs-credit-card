import React from 'react';
import PropTypes from 'prop-types';
import { DetectCardNumberType } from '../../../utils/general';

function CardBottomNumber({ cardNumber, middlePartHide }) {
  let type = DetectCardNumberType(cardNumber);
  let iteratorCount = type !== 3 ? 4 : 3;
  let seperatorValues = [];

  if (type !== 3) {
    for (let i = 0; i < iteratorCount; i++) {
      seperatorValues[i] = cardNumber.slice(i * 4, (i + 1) * 4)
        ? cardNumber.slice(i * 4, (i + 1) * 4)
        : '0000';
    }

    if (middlePartHide) {
      seperatorValues[1] = '****';
      seperatorValues[2] = '****';
    }
  } else {
    seperatorValues[0] = cardNumber.slice(0, 4)
      ? cardNumber.slice(0, 4)
      : '0000';
    seperatorValues[1] = cardNumber.slice(4, 10)
      ? cardNumber.slice(4, 10)
      : '000000';
    seperatorValues[2] = cardNumber.slice(10, 15)
      ? cardNumber.slice(10, 15)
      : '00000';

    if (middlePartHide) seperatorValues[1] = '******';
  }

  let seperatorElementList = seperatorValues.map((val, index) => (
    <span className="seperator" key={index}>
      {val}
    </span>
  ));

  return <div className="card-number">{seperatorElementList}</div>;
}

CardBottomNumber.propTypes = {
  cardNumber: PropTypes.string,
  type: PropTypes.number,
};

CardBottomNumber.defaultProps = {
  cardNumber: '',
};

export default CardBottomNumber;
