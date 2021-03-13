import React from 'react';
import { render } from '@testing-library/react';
import Tester from '../componentTest/Tester';

describe('Test to check for starting contents', () => {
  test("card number's seperators start values have to be zero", () => {
    const { container } = render(<Tester />);
    expect(
      container.querySelector('.card-number').firstChild.textContent
    ).toContain('000');
  });

  test("card valid thru year contains this year's value of the last 2 digit", () => {
    const { container } = render(<Tester />);
    const year = new Date().getFullYear().toString().slice(2, 4);
    expect(container.querySelector('.thru').lastChild.textContent).toContain(
      year
    );
  });

  test("card holder's seperator contains CARD HOLDER", () => {
    const { container } = render(<Tester />);
    expect(container.firstChild.textContent).toContain('CARD HOLDER');
  });
});
