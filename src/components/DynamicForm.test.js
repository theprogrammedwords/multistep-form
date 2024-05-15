// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DynamicForm } from './DynamicForm';
import { dataTypes } from '../configs/formdata';

const mockFormData = [
  {
    key: 'personal_info',
    label: 'Personal Information',
    fields: [
      {
        key: 'first_name',
        label: 'First Name',
        mandatory: true,
        order: 1,
        placeholder: 'Enter your first name',
        type: dataTypes.TEXTFIELD,
        valuetype: 'text'
      },
      {
        key: 'last_name',
        label: 'Last Name',
        mandatory: true,
        order: 2,
        placeholder: 'Enter your last name',
        type: dataTypes.TEXTFIELD,
        valuetype: 'text'
      }
    ]
  },
  {
    key: 'loan_info',
    label: 'Loan Information',
    fields: [
      {
        key: 'loan_amount',
        label: 'Loan Amount',
        mandatory: true,
        order: 1,
        placeholder: 'Enter desired loan amount',
        type: dataTypes.TEXTFIELD,
        valuetype: 'number'
      }
    ]
  }
];

describe('DynamicForm', () => {
  test('renders form fields and allows navigation', () => {
    render(<DynamicForm data={mockFormData} id="test-id" />);

    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument();

    // Fill in the first step form fields
    fireEvent.change(screen.getByPlaceholderText('Enter your first name'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your last name'), {
      target: { value: 'Doe' }
    });

    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByPlaceholderText('Enter desired loan amount')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter desired loan amount'), {
      target: { value: '10000' }
    });
    fireEvent.click(screen.getByText('Review'));

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Loan Information')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Data submitted successfully !!!')).toBeInTheDocument();
  });
});
