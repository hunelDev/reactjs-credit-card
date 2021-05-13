import React, { useContext, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import { parseProps } from '../utils/general';
import validation from '../utils/HunelValidation';

export default function CardSecurityCode(props) {
  const [securityCode, setSecurityCode] = useState('');
  const { pokeVirtualCardStates, getCardNumber } = useContext(hunelContext);
  const newProps = parseProps(props, 'value');

  function handleChange(e) {
    const { value } = e.target;
    if (validation.ValidateCardSecurtyCode(value, getCardNumber())) {
      pokeVirtualCardStates(5, value);
      setSecurityCode(value);
    }
  }

  return (
    <input
      type="text"
      onChange={(e) => {
        handleChange(e);
        if ('onChange' in newProps) newProps['onChange'](e);
      }}
      onFocus={(e) => {
        pokeVirtualCardStates(6, 1);
        if ('onFocus' in newProps) newProps['onFocus'](e);
      }}
      onBlur={(e) => {
        pokeVirtualCardStates(6, 0);
        if ('onBlur' in newProps) newProps['onBlur'](e);
      }}
      value={securityCode}
      {...parseProps(newProps, 'onChange', 'onFocus', 'onBlur')}
    />
  );
}
