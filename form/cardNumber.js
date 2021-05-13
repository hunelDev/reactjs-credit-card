import React, { useContext, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import { parseProps } from '../utils/general';
import validation from '../utils/HunelValidation';

export default function CardNumber(props) {
  const [cardNumber, setCardNumber] = useState('');
  const { pokeVirtualCardStates } = useContext(hunelContext);
  const newProps = parseProps(props, 'value', 'type');

  function handleChange(e) {
    const { value } = e.target;

    if (
      validation.ValidateCardNumberChange(value) &&
      validation.ValidateCardNumberLength(value)
    ) {
      pokeVirtualCardStates(1, value);
      setCardNumber(value);
    }
  }

  return (
    <input
      type="text"
      onChange={(e) => {
        handleChange(e);
        if ('onChange' in newProps) newProps['onChange'](e);
      }}
      value={cardNumber}
      {...parseProps(newProps, 'onChange')}
    />
  );
}
