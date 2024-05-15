// @ts-nocheck
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { formData } from './configs/formdata';

describe('App Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
  });

  test('renders the Loan Form heading', () => {
    const headingElement = screen.getByText(/Loan Form/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the container with the correct styles', () => {
    const containerElement = screen.getByText(/Loan Form/i).parentElement;
    expect(containerElement).toHaveStyle(`
      width: 100%;
      text-align: center;
      border: 1px solid ${theme.colors.quaternary};
      background-color: ${theme.colors.tertiary};
      font-family: ${theme.fonts[0]};
    `);
  });

  test('renders the DynamicForm component', () => {
    const dynamicFormElement = screen.getByTestId('dynamic-form');
    expect(dynamicFormElement).toBeInTheDocument();
  });

  test('renders the body with the correct styles', () => {
    const bodyElement = containerElement.nextElementSibling;
    expect(bodyElement).toHaveStyle(`
      margin: 40px;
      height: calc(100vh - 160px);
      text-align: center;
      border: 2px solid ${theme.colors.tertiary};
      background-color: ${theme.colors.quaternary};
      font-family: ${theme.fonts[0]};
      border-radius: 8px;
    `);
  });

  test('responsive styles for the body at max-width: 768px', () => {
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));

    const bodyElement = containerElement.nextElementSibling;
    expect(bodyElement).toHaveStyle(`
      margin: 10px 14px;
      height: fit-content;
    `);
  });
});
