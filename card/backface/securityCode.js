import React from 'react';
import Seperator from '../seperator';

export default function SecurityCode({ securityCode }) {
  return (
    <div className="card-security-ribbon">
      <Seperator classes="card-security-code" seperator={false}>
        {securityCode}
      </Seperator>
    </div>
  );
}
