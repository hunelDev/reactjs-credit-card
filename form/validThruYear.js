import React, { useContext, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import { GetCardValidThruYear, parseProps, YearList } from '../utils/general';

function ValidThruYear(props) {
  const {
    pokeMonthState,
    InitvvalidThruYear,
    pokeVirtualCardStates,
  } = useContext(hunelContext);
  const [validThruYear, setValidThruYear] = useState(InitvvalidThruYear);
  const len = 10;
  const newProps = parseProps(props, 'value');

  function handleChange(e) {
    let { value } = e.target;
    value = GetCardValidThruYear(value, len);
    pokeMonthState(value);
    pokeVirtualCardStates(4, value);
    setValidThruYear(value);
  }

  const yearList = YearList(10).map((year) => (
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
