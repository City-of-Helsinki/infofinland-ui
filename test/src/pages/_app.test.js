/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import App from '@/pages/_app';
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
  events: {
    on: jest.fn(),
    off: jest.fn()
  },
  useRouter: jest.fn()
}))
jest.mock('@/hooks/useAnalytics', () => ({
  __esModule: true,
  default: jest.fn()
}))
useRouter.mockImplementation(() => ({
  events: {
    on: jest.fn(),
    off: jest.fn()
  }
}))

describe('App', () => {
  it('should render', () => {
    render(<App Component={() => <div>Test</div>} pageProps={{}} />);

    waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});