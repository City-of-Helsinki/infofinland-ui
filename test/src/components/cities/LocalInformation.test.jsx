/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import LocalInformation from '@/components/cities/LocalInformation'
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
useRouter.mockImplementation(() => ({
  locale: 'fi'
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (i18nKey) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('LocalInformation', () => {
  it('should render', () => {
    const { asFragment } = render(<LocalInformation cities={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
