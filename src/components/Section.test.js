// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Section } from './Section';

const mockReadableKeyString = jest.fn((key) => key);
const mockToTitleCase = jest.fn((str) => str);

jest.mock('../utils/appUtils', () => ({
  readableKeyString: mockReadableKeyString,
  toTitleCase: mockToTitleCase
}));

describe('Section Component', () => {
  beforeEach(() => {
    mockReadableKeyString.mockClear();
    mockToTitleCase.mockClear();
  });

  const mockItems = [
    { id: 'loanAmount', value: '1000' },
    { id: 'interestRate', value: '5%' }
  ];

  const mockErrors = [
    { id: 'loanAmount', isValid: true, message: '' },
    { id: 'interestRate', isValid: false, message: 'Invalid interest rate' }
  ];

  const mockTitle = 'loan details';

  test('renders Section component correctly', () => {
    mockToTitleCase.mockReturnValue('Loan');
    mockReadableKeyString.mockImplementation((key) => key.replace(/([A-Z])/g, ' $1').trim());

    render(<Section title={mockTitle} items={mockItems} error={mockErrors} />);

    expect(mockToTitleCase).toHaveBeenCalledWith(mockTitle);
    expect(screen.getByText('Loan Details')).toBeInTheDocument();

    mockItems.forEach((item, index) => {
      expect(
        screen.getByText(`${item.id.replace(/([A-Z])/g, ' $1').trim()} :`)
      ).toBeInTheDocument();
      if (mockErrors[index].isValid) {
        expect(screen.getByText(item.value)).toBeInTheDocument();
      } else {
        expect(screen.getByText(item.value)).toHaveStyle('color: red');
        expect(screen.getByText(mockErrors[index].message)).toHaveStyle(
          'color: red; font-size: 8px'
        );
      }
    });
  });
});
