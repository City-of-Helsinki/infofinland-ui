import { act, render } from '@testing-library/react';
import SiteMap, { getStaticProps } from '@/pages/sitemap';

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

jest.mock('@/lib/ssr-api', () => ({
  getCachedMenus: jest.fn().mockResolvedValue({
    main: { items: [] },
    cities: { items: [] },
    about: { items: [] },
  }),
  getCachedAboutMenus: jest.fn().mockResolvedValue({
    about: { items: [] },
  }),
  getCachedCitiesMenus: jest.fn().mockResolvedValue({
    cities: { items: [] },
  }),
  getCachedMainMenus: jest.fn().mockResolvedValue({
    main: { items: [] },
  }),
}))

jest.mock('@/lib/drupal-client', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getResourceByPath: jest.fn().mockResolvedValue('test-node')
  }))
}))

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

    it('should get the static props', async () => {
      const props = await getStaticProps({ locale: 'fi', preview: false })
      expect(props.props.urls).toBeDefined()
      expect(props.props.menus).toBeDefined()
      expect(props.props.node).toBeDefined()
    })
  })
})
