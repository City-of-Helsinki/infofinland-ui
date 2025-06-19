import { act, render } from '@testing-library/react';
import SiteMap from '@/pages/sitemap';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    locale: 'fi',
    asPath: '/sitemap',
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
  describe('sitemap', () => {
    it('should render the page', async () => {
      let container;
      await act(async () => {
        const component = render(<SiteMap urls={{}} menus={[]} node={{}} />)
        container = component.container
      })
      expect(container).toMatchSnapshot()
    })
  })
})
