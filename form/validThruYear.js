import React, { useContext, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import { GetCardValidThruYear, parseProps, YearList } from '../utils/general';

function ValidThruYear(props) {
  const {
    pokeMonthState,
    _validThruYear,
    pokeVirtualCardStates,
    _config,
  } = useContext(hunelContext);
  const { yearLength } = _config;
  const [validThruYear, setValidThruYear] = useState(_validThruYear);
  const newProps = parseProps(props, 'value');

  function handleChange(e) {
    let { value } = e.target;
    value = GetCardValidThruYear(value, yearLength);
    pokeMonthState(value);
    pokeVirtualCardStates(4, value);
    setValidThruYear(value);
  }

  const yearList = YearList(yearLength).map((year) => (
    <option value={year} key={year}>
      {year.toString()[2] + year.toString()[3]}
    </option>
  ));

  return (
    <select
      onChange={(e) => {
        handleChange(e);
        if ('onChange' in newProps) newProps['onChange'](e);
      }}
      value={validThruYear}
      {...parseProps(newProps, 'onChange')}
    >
      {yearList}
    </select>
  );
}

export default ValidThruYear;
