import React from 'react';
import HunelContext from './HunelContext';

export default function HunelProvider({ config, children }) {
  return (
    <HunelContext.Provider value={config}>{children}</HunelContext.Provider>
  );
}
