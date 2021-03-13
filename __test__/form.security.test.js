import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tester from '../componentTest/Tester';

describe('secuirty code checking', () => {
  test('security code length to be 3 when card number start with 4-51-644', () => {
    const { container } = render(<Tester />);
    const code = container.querySelector('.code');
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '51',
      },
    });

    fireEvent.change(code, {
      target: {
        value: '524',
      },
    });

    expect(code.value.length).toBe(3);
  });

  test('security code length to be 3 when card number started with 4-51-644', () => {
    const { container } = render(<Tester />);
    const code = container.querySelector('.code');
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '34',
      },
    });

    fireEvent.change(code, {
      target: {
        value: '5252',
      },
    });

    expect(code.value.length).toBe(4);
  });
});
