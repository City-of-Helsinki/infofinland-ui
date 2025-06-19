import { act, render } from '@testing-library/react';
import { PageNotFound } from '@/pages/404';

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

describe('pages', () => {
  describe('404', () => {
    it('should render the page', async () => {
      let container;
      await act(async () => {
        const component = render(<PageNotFound menus={[]} />)
        container = component.container
      })
      expect(container).toMatchSnapshot()
    })
  })
})
