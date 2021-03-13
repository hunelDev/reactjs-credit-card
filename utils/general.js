import React from 'react';
import { useContext } from 'react';
import hunelContext from './HunelContext';
import validation from './HunelValidation';

function iterator(start, len) {
  return Array.from(Array(len), (v, k) => start + k);
}

export function MonthList(year) {
  const date = new Date();
  if (+year === date.getFullYear())
    return iterator(date.getMonth() + 1, 12 - date.getMonth());

  return iterator(1, 12);
}

export function YearList(len) {
  const date = new Date();
  return iterator(date.getFullYear(), len);
}

export function DetectCardNumberType(value) {
  if (value) {
    if (/^4/.test(value)) return 1;
    if (+value[0] === 5 && typeof value[1] !== 'undefined')
      if (/^5[1-5]/.test(value)) return 2;
    if (+value[0] === 3 && typeof value[1] !== 'undefined')
      if (/^3[47]/.test(value)) return 3;
    if (+value[0] === 6 && typeof value[1] !== 'undefined')
      if (/^65/.test(value)) return 4;
    if (+value[0] === 6 && typeof value[2] !== 'undefined')
      if (/^(644|65)/.test(value)) return 4;
    if (+value[0] === 6 && typeof value[3] !== 'undefined')
      if (/^(6011|644|65)/.test(value)) return 4;
  }

  return 0;
}

export function useCardForm() {
  const { getFormData } = useContext(hunelContext);

  return function () {
    const {
      cardNumber,
      cardHolder,
      validThruMonth,
      validThruYear,
      securityCode,
      validYearLength,
    } = getFormData();

    const cardNumberValid =
      validation.ValidateCardNumberBlur(cardNumber) &&
      validation.ValidateLuhnAlgorithm(cardNumber);
    const cardOwnerValid = validation.ValidateCardOwnerBlur(cardHolder);
    const validThruMonthValid = validation.ValidateCardValidThruMonth(
      validThruMonth,
      validThruYear
    );
    const validThruYearValid = validation.ValidateCardValidThruYear(
      validThruYear,
      validYearLength
    );

    const securityCodeValid = validation.ValidateCardSecurtyCodeBlur(
      securityCode,
      cardNumber
    );

    const isValid =
      cardNumberValid &&
      cardOwnerValid &&
      validThruMonthValid &&
      validThruYearValid &&
      securityCodeValid;

    return [
      {
        number: {
          value: cardNumber,
          isValid: cardNumberValid,
        },
        holder: {
          value: cardHolder,
          isValid: cardOwnerValid,
        },
        validMonth: {
          value: validThruMonth,
          isValid: validThruMonthValid,
        },
        validYear: {
          value: validThruYear,
          isValid: validThruYearValid,
        },
        securityCode: {
          value: securityCode,
          isValid: securityCodeValid,
        },
      },
      isValid,
    ];
  };
}

export function cardForm(Component) {
  return function () {
    const getCardForm = useCardForm();
    return <Component getCardForm={getCardForm} />;
  };
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function GetCardValidThruMonth(value, relativeYear) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (isNaN(value)) return month;
  if (relativeYear <= year) return clamp(value, month, 12);
  return clamp(value, 1, 12);
}

export function GetCardValidThruYear(value, len) {
  const year = new Date().getFullYear();

  if (isNaN(+value)) return year;
  return clamp(+value, year, year + len - 1);
}

export function parseProps(props, ...args) {
  const newObj = { ...props };
  args.forEach((arg) => {
    delete newObj[arg];
  });

  return newObj;
}
