import { DetectCardNumberType } from './general';

class HunelValidation {
  constructor() {
    this.CheckIsNumeric = this.CheckIsNumeric.bind(this);
  }

  ValidateLuhnAlgorithm(value) {
    const valueArr = value.split('');
    const evenArr = valueArr
      .reverse()
      .filter((val, index) => (index + 1) % 2 === 0);

    const evenTotal = evenArr.reduce((total, val) => {
      let doubleValue = val * 2;
      if (doubleValue > 9)
        return (total +=
          +doubleValue.toString()[0] + +doubleValue.toString()[1]);

      return (total += doubleValue);
    }, 0);

    const oddArr = valueArr.filter((val, index) => (index + 1) % 2 !== 0);
    const oddTotal = oddArr.reduce((total, val) => (total += +val), 0);

    if ((evenTotal + oddTotal) % 10 === 0) return true;

    return false;
  }

  CheckIsNumeric(value) {
    return /^[0-9]+$/.test(value);
  }

  ValidateCardNumberChange(value) {
    if (value) {
      if (!this.CheckIsNumeric(value)) return false;
      if (!/^[3-6]/.test(value)) return false;
      if (+value[0] === 5 && typeof value[1] !== 'undefined')
        if (!/^5[1-5]/.test(value)) return false;
      if (+value[0] === 3 && typeof value[1] !== 'undefined')
        if (!/^3[47]/.test(value)) return false;
      if (+value[0] === 6 && typeof value[1] !== 'undefined')
        if (!/^6[045]/.test(value)) return false;
      if (+value[0] === 6 && typeof value[2] !== 'undefined')
        if (!/^(601|644|65)/.test(value)) return false;
      if (+value[0] === 6 && typeof value[3] !== 'undefined')
        if (!/^(6011|644|65)/.test(value)) return false;
    }

    return true;
  }

  ValidateCardNumberLength(value) {
    if (value.length > 0) {
      if (/^(4|5|6)/.test(value)) return value.length <= 16;
      if (/^3/.test(value)) return value.length <= 15;
      return false;
    }

    return true;
  }

  ValidateCardNumberBlur(value) {
    if (/^3[47][0-9]{13}$/.test(value)) return true;
    if (/^4[0-9]{15}$/.test(value)) return true;
    if (/^5[1-5][0-9]{14}$/.test(value)) return true;
    if (/^(6011|644|65)/.test(value) && /^6[0-9]{15}$/.test(value)) return true;

    return false;
  }

  ValidateCardValidThruMonth(value, relativeYear) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (isNaN(+value)) return false;
    if (value > 12 || value < 1) return false;
    if (relativeYear <= year) if (value < month) return false;

    return true;
  }

  ValidateCardValidThruYear(value, len) {
    const year = new Date().getFullYear();
    if (isNaN(+value)) return year;
    if (value > year + len - 1 || value < year) return false;

    return true;
  }

  ValidateCardOwner(value) {
    if (value.length < 1) return true;
    if (value.length > 128) return false;
    if (/\d+|^\s+|^\W/i.test(value)) return false;
    if (!/^[\p{L} `'~.]+$/iu.test(value)) return false;

    return true;
  }

  ValidateCardOwnerBlur(value) {
    if (/^\s|\s$/.test(value)) return false;
    const ownerArr = value.split(' ');
    if (ownerArr.length < 2) return false;
    return ownerArr.every((s) => new RegExp(/^[\p{L}`'~.]{1,24}$/iu).test(s));
  }

  ValidateCardSecurtyCode(value, cardNumber) {
    const cardType = DetectCardNumberType(cardNumber);
    if (cardType !== 3) return /^[0-9]{0,3}$/.test(value);
    return /^[0-9]{0,4}$/.test(value);
  }

  ValidateCardSecurtyCodeBlur(value, cardNumber) {
    const cardType = DetectCardNumberType(cardNumber);
    if (cardType !== 3) return /^[0-9]{3}$/.test(value);
    return /^[0-9]{4}$/.test(value);
  }
}

export default new HunelValidation();
