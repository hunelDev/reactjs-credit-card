import React, { useContext, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import { parseProps } from '../utils/general';
import validation from '../utils/HunelValidation';

export default function CardHolder(props) {
  const [cardOwner, setCardOwner] = useState('');
  const { pokeVirtualCardStates } = useContext(hunelContext);

  const newProps = parseProps(props, 'type', 'value');

  function handleChange(e) {
    let { value } = e.target;
    if (validation.ValidateCardOwner(value)) {
      value = value.toUpperCase();
      pokeVirtualCardStates(2, value);
      setCardOwner(value);
    }
  }

  return (
    <input
      type="text"
      onChange={(e) => {
        handleChange(e);
        if ('onChange' in newProps) newProps['onChange'](e);
      }}
      value={cardOwner}
      {...parseProps(newProps, 'onChange')}
    />
  );
}
