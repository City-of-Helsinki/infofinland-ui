import {
  getCachedMenus,
  getCachedAboutMenus,
  getCachedMainMenus,
  getCachedCitiesMenus,
  getMainMenus,
  getTranslatedPathFromContext,
} from '@/lib/ssr-api'
import logger from '@/logger'

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
    })),
    getPathFromContext: jest.fn(() => '/enable/testing'),
    translatePath: jest.fn((path) => path),
  }))
}))

describe('ssr-api', () => {
  describe('getCachedMenus', () => {
    it('should remove undefined values from menus', async () => {
      jest.spyOn(logger, 'http').mockImplementation()
      const menus = await getCachedMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
      expect(logger.http).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      )
    })
  })

  describe('getCachedAboutMenus', () => {
    it('should remove undefined values from menus', async () => {
      jest.spyOn(logger, 'http').mockImplementation()
      const menus = await getCachedAboutMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.about.data.menu.items[0]).not.toHaveProperty('items')
      expect(logger.http).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      )
    })
  })

  describe('getCachedMainMenus', () => {
    it('should remove undefined values from menus', async () => {
      jest.spyOn(logger, 'http').mockImplementation()
      const menus = await getCachedMainMenus({ locale: 'en' })
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
      expect(logger.http).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      )
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
      expect(menus).toBeDefined()
      expect(menus.main.data.menu.items[0]).not.toHaveProperty('items')
    })
  })

  describe('getTranslatedPathFromContext', () => {
    it('should return the translated path', async () => {
      const path = await getTranslatedPathFromContext({ 
        locale: 'en',
      })
      expect(path).toBe('/en/enable/testing')
    })
  })
})
