import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Tester from '../componentTest/Tester';

describe('card situation after onChange event firing', () => {
  test('CardHolder value will change after event', () => {
    const { container } = render(<Tester />);
    const holder = container.querySelector('.holder');
    fireEvent.change(holder, {
      target: { value: 'HUNEL' },
    });
    expect(holder.value).toBe('HUNEL');
  });

  test('CardHolder validation checking', () => {
    const { container } = render(<Tester />);
    const holder = container.querySelector('.holder');
    fireEvent.change(holder, {
      target: { value: '$^%HUNEL&' },
    });
    expect(holder.value).toBe('');
  });

  test('Valid thru month year has (12-mon) children opt when year is current year', () => {
    const { container } = render(<Tester />);
    const mon = new Date().getMonth();
    const curYear = new Date().getFullYear();
    const year = container.querySelector('.year');
    const month = container.querySelector('.month');
    fireEvent.change(year, {
      target: {
        value: curYear,
      },
    });

    expect(month.children.length).toBe(12 - mon);
  });
});
