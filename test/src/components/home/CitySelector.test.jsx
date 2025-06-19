/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react'
import CitySelector from '@/components/home/CitySelector'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    locale: 'fi',
    asPath: '/foo/bar',
    events: {
      on: jest.fn(),
      off: jest.fn()
    },
  })
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

describe('CitySelector', () => {
  it('should render the CitySelector component', () => {
    const { asFragment } = render(<CitySelector />)
    expect(asFragment()).toMatchSnapshot()
  })
})
