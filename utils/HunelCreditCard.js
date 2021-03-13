/**
 * @typedef HunelConfig
 * @type {object}
 * @property {boolean} middlePartHide - It's uses to hide the middle part of credit card number, default value is false
 */

/**
 * @type {HunelConfig}
 */
var hunelConfig = {
  middlePartHide: false,
};

export default class HunelCreditCard {
  #date = new Date();
  #cardNumber = '';
  #owner = '';
  #validThruMonth = this.#date.getMonth() + 1;
  #validThruYear = this.#date.getFullYear();
  #validThruYearLength = 10;
  #securityCode = '';
  #fnMounth = null;
  #fnCardStates = null;
  #config = hunelConfig;
  /**
   *
   * @param {HunelConfig} config  a config object which can configure the HunelCreditCard instance
   */
  constructor(config) {
    this.#config = { ...hunelConfig, ...config };
    this.pokeMonthState = this.pokeMonthState.bind(this);
    this.setMonthRelativeWithYear = this.setMonthRelativeWithYear.bind(this);
    this.setVirtualCardStates = this.setVirtualCardStates.bind(this);
    this.pokeVirtualCardStates = this.pokeVirtualCardStates.bind(this);
    this.setContextStateValue = this.setContextStateValue.bind(this);
    this.getCardNumber = this.getCardNumber.bind(this);
    this.getFormData = this.getFormData.bind(this);
  }

  get _config() {
    return this.#config;
  }

  get _cardNumber() {
    return this.#cardNumber;
  }

  set _cardNumber(value) {
    this.#cardNumber = value;
  }

  get _owner() {
    return this.#owner;
  }

  set _owner(value) {
    this.#owner = value;
  }

  get _validThruMonth() {
    return this.#validThruMonth;
  }

  set _validThruMonth(value) {
    this.#validThruMonth = value;
  }

  get _validThruYear() {
    return this.#validThruYear;
  }

  set _validThruYear(value) {
    this.#validThruYear = value;
  }

  get _securityCode() {
    return this.#securityCode;
  }

  set _securityCode(value) {
    this.#securityCode = value;
  }

  get _validThruYearLength() {
    return this.#validThruYearLength;
  }

  setMonthRelativeWithYear(fn) {
    this.#fnMounth = fn;
  }

  pokeMonthState(year) {
    this.#fnMounth(year);
  }

  setVirtualCardStates(fn) {
    this.#fnCardStates = fn;
  }

  pokeVirtualCardStates(type, value) {
    this.#fnCardStates(type, value);
  }

  setContextStateValue(type, value) {
    switch (type) {
      case 1:
        this._cardNumber = value;
        break;
      case 2:
        this._owner = value;
        break;
      case 3:
        this._validThruMonth = value;
        break;
      case 4:
        this._validThruYear = value;
        break;
      case 5:
        this._securityCode = value;
        break;
      default:
    }
  }

  getCardNumber() {
    return this._cardNumber;
  }

  getFormData() {
    return {
      cardNumber: this._cardNumber,
      cardHolder: this._owner,
      validThruMonth: this._validThruMonth,
      validThruYear: this._validThruYear,
      securityCode: this._securityCode,
      validYearLength: this._validThruYearLength,
    };
  }
}
