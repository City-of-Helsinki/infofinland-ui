/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react'
import FooterLinks from '@/components/layout/FooterLinks'

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

describe('FooterLinks', () => {
  it('should render the FooterLinks component', () => {
    const { asFragment } = render(<FooterLinks tree={[]} secondary={false} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
