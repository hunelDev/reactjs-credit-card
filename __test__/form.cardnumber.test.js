import React from 'react';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import Tester from '../componentTest/Tester';

describe('CardNumber checking', () => {
  test('card number has to start with 37-34-4-51-601..', () => {
    const { container } = render(<Tester />);
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '123',
      },
    });
    expect(cardNumber.value).toBe('');
  });

  test('card number has to start with 37-34-4-51-601..', () => {
    const { container } = render(<Tester />);
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '51',
      },
    });
    expect(cardNumber.value).toBe('51');
  });

  test('card type should change after card number type determinated', async () => {
    const { container } = render(<Tester />);
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '4',
      },
    });

    await waitFor(() => screen.getByAltText('visa'));

    expect(container.querySelector('.card-type').firstChild).toHaveAttribute(
      'alt',
      'visa'
    );
  });

  test('card type should change after card number type determinated', async () => {
    const { container } = render(<Tester />);
    const cardNumber = container.querySelector('.cardNumber');
    fireEvent.change(cardNumber, {
      target: {
        value: '6011',
      },
    });

    await waitFor(() => screen.getByAltText('discover'));

    expect(container.querySelector('.card-type').firstChild).toHaveAttribute(
      'alt',
      'discover'
    );
  });
});
