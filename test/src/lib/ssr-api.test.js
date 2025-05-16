import {
  getCachedMenus,
  getCachedAboutMenus,
  getCachedMainMenus,
  getCachedCitiesMenus,
  getMainMenus,
} from '@/lib/ssr-api'

jest.mock('@/lib/cacher/menu-cache', () => ({
  cache: {
    has: jest.fn(() => false),
    get: jest.fn(),
    set: jest.fn(),
  },
  getKey: jest.fn(),
}))
jest.mock('@/lib/drupal-client', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getMenu: jest.fn(() => Promise.resolve({
      data: {
        menu: {
          items: [
            {
              id: '1',
              name: 'Home',
              url: '/',
              items: undefined,
            },
          ]
        }
      }
    }))
  }))
}))

describe('ssr-api', () => {
  describe('getCachedMenus', () => {
    it('should remove undefined values from menus', async () => {
      const menus = await getCachedMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
    })
  })

  describe('getCachedAboutMenus', () => {
    it('should remove undefined values from menus', async () => {
      const menus = await getCachedAboutMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.about.data.menu.items[0]).not.toHaveProperty('items')
    })
  })

  describe('getCachedMainMenus', () => {
    it('should remove undefined values from menus', async () => {
      const menus = await getCachedMainMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
    })
  })

  describe('getCachedCitiesMenus', () => {
    it('should remove undefined values from menus', async () => {
      const menus = await getCachedCitiesMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.cities.data.menu.items[0]).not.toHaveProperty('items')
    })
  })

  describe('getMainMenus', () => {
    it('should remove undefined values from menus', async () => {
      const menus = await getMainMenus({ locale: 'en' })
      console.log(menus.main.data.menu.items[0])
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
    })
  })
})
