import { render } from '@testing-library/react';
import MyDocument from '@/pages/_document';
import React from 'react';

jest.mock('next/document', () => ({
  __esModule: true,
  ...jest.requireActual('next/document'),
  Html: jest.fn().mockImplementation((props) => (
    <div data-dir={props.dir} data-lang={props.lang} />
  ))
}));

describe('pages', () => {
  describe('_document', () => {
    it('should render', async () => {
      const { container } = render(<MyDocument locale="fi" />)
      expect(container).toMatchSnapshot()
    })

    it('should render with rtl locale', async () => {
      const { container } = render(<MyDocument locale="ar" />)
      expect(container).toMatchSnapshot()
    })
  })
})
