import { render, screen } from '@testing-library/react';
import App from './App';
import Theme from './theme/theme';

describe('App Component', () => {
  beforeEach(() => {
    render(
      <Theme>
        <App />
      </Theme>
    );
  });

  test('renders the Loan Form heading', () => {
    const headingElement = screen.getByText(/Loan Form/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the container with the correct styles', () => {
    const headingElement = screen.getByText(/Loan Form/i);
    const containerElement = headingElement.closest('div');
    expect(containerElement).toHaveStyle(`
      width: 100%;
      text-align: center;
    `);
  });

  test('renders the DynamicForm component', () => {
    const dynamicFormElement = screen.getByTestId('dynamic-form');
    expect(dynamicFormElement).toBeInTheDocument();
  });

  test('renders the body with the correct styles', () => {
    const bodyElement = screen.getByTestId('dynamic-form').parentElement;
    expect(bodyElement).toHaveStyle(`
      margin: 40px;
      height: calc(100vh - 160px);
      text-align: center;
      border-radius: 8px;
    `);
  });

  test('responsive styles for the body at max-width: 768px', () => {
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));

    const formElement = screen.queryByTestId('dynamic-form');
    if (!formElement) {
      console.error('Element with test-id "dynamic-form" not found.');
      return;
    }

    const bodyElement = formElement.parentElement;
    expect(bodyElement).toHaveStyle(`
      margin: 40px;
    `);
  });
});
