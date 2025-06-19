/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react'
import { LanguageMenu, LanguageMenuButton } from '@/components/layout/languages/LanguageMenu'

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

describe('LanguageMenu', () => {
  it('should render the LanguageMenu component', () => {
    const { asFragment } = render(<LanguageMenu />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the LanguageMenuButton component', () => {
    const { asFragment } = render(<LanguageMenuButton />)
    expect(asFragment()).toMatchSnapshot()
  })
})
