import React from 'react';
import Card from '../card';
import {
  CardHolder,
  CardNumber,
  ValidThruYear,
  ValidThruMonth,
  CardSecurityCode,
} from '../form';
import { HunelCreditCard, HunelProvider } from '../index';

const hunel = new HunelCreditCard({
  yearLength: 12,
});

export default function Tester() {
  return (
    <HunelProvider config={hunel}>
      <Card cardClass="try" fixClass />
      <CardHolder className="holder" />
      <CardNumber className="cardNumber" />
      <ValidThruYear className="year" />
      <ValidThruMonth className="month" />
      <CardSecurityCode className="code" />
    </HunelProvider>
  );
}
