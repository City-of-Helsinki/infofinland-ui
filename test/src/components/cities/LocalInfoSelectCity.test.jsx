/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import LocalInfoSelectCity from '@/components/cities/LocalInfoSelectCity'

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

describe('LocalInfoSelectCity', () => {
  it('should render', () => {
    const { asFragment } = render(<LocalInfoSelectCity id="1" name="Helsinki" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
