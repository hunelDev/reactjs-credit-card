import React from 'react';
import Seperator from '../../../../seperator';

export default function CardBottomLowestValidThruLeft() {
  return (
    <div className="valid-thru-left">
      <Seperator classes="block-label" seperator={false}>
        valid
      </Seperator>
      <Seperator classes="block-label" seperator={false}>
        thru
      </Seperator>
    </div>
  );
}
