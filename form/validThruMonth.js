import React, { useContext, useState } from 'react';
import { GetCardValidThruMonth, MonthList, parseProps } from '../utils/general';
import hunelContext from '../utils/HunelContext';

export default function ValidThruMonth(props) {
  const {
    setMonthRelativeWithYear,
    _validThruMonth,
    _validThruYear,
    pokeVirtualCardStates,
  } = useContext(hunelContext);
  const [validThruMonth, setValidThruMonth] = useState(_validThruMonth);
  const [validThruYear, setValidThruYear] = useState(_validThruYear);
  const newProps = parseProps(props, 'value');

  function handleChange(e) {
    let { value } = e.target;
    value = GetCardValidThruMonth(value, validThruYear);
    pokeVirtualCardStates(3, value);
    setValidThruMonth(value);
  }

  function _handleValidYear(year) {
    setValidThruYear(year);
  }

  setMonthRelativeWithYear(_handleValidYear);

  var montList = MonthList(validThruYear).map((month) => (
    <option value={month} key={month}>
      {month < 10 ? `0${month}` : month}
    </option>
  ));

  return (
    <select
      onChange={(e) => {
        handleChange(e);
        if ('onChange' in newProps) newProps['onChange'](e);
      }}
      value={validThruMonth}
      {...parseProps(newProps, 'onChange')}
    >
      {montList}
    </select>
  );
}
