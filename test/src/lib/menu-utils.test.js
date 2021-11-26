import * as menuUtils from '../../../src/lib/menu-utils'
import MAIN_MENU from './MAIN_MENU'

describe.only('menu-utils', () => {
  describe('findParent', () => {
    it('shound return item matching the parent id', () => {
      const parent = menuUtils.findParent({
        items: MAIN_MENU.items,
        parentId: 'menu_link_content:7f557279-2910-4354-9b1c-7462200ff6f7',
      })
      const noParent = menuUtils.findParent({
        items: MAIN_MENU.items,
        parentId: 'foo',
      })
      expect(parent).not.toBeUndefined()
      expect(noParent).toBeUndefined()
    })
  })

  describe('findRootForPage', () => {
    it('should return root item for given child page', () => {
      const root = menuUtils.findRootForPath({
        items: MAIN_MENU.items,
        path: '/en/asettuminen-suomeen/living-in-finland',
      })
      expect(root).not.toBeUndefined()
      expect(root.url).toBe('/en/settling-in-finland')

      const noRoot = menuUtils.findRootForPath({
        items: MAIN_MENU.items,
        path: '/not/a/real/path',
      })
      expect(noRoot).toBeUndefined()
    })
  })
})
