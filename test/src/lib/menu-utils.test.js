import * as menuUtils from '../../../src/lib/menu-utils'
import MAIN_MENU from './MAIN_MENU'

describe('menu-utils', () => {
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

  describe('findTheme', () => {
    it('should return the root level item of items tree with matching url', () => {
      const theme = menuUtils.findTheme({
        tree: MAIN_MENU.tree,
        path: '/en/settling-in-finland',
      })

      const noTheme = menuUtils.findTheme({
        tree: MAIN_MENU.tree,
        path: '/en/foofoo',
      })

      expect(theme).not.toBeUndefined()
      expect(theme.url).toBe('/en/settling-in-finland')
      expect(noTheme).toBeUndefined()
    })
  })

  describe('getRootPages', () => {
    it('should  return every item from flat menu item list that has no parent', () => {
      expect(menuUtils.getRootPages(MAIN_MENU.items).length).toBe(3)
      expect(
        menuUtils.getRootPages([
          { parent: '' },
          { parent: '1' },
          { parent: '2' },
        ]).length
      ).toBe(1)
    })
    it('should return empty list if no parentles items are found', () => {
      expect(menuUtils.getRootPages([]).length).toBe(0)
      expect(menuUtils.getRootPages([{ parent: '1' }]).length).toBe(0)
    })
  })

  describe('findPageByPath', () => {
    it('should return item from flat item list by matching url', () => {
      const page = menuUtils.findPageByPath({
        items: MAIN_MENU.items,
        path: '/en/settling-in-finland',
      })

      const noPage = menuUtils.findPageByPath({
        items: MAIN_MENU.items,
        path: '/en/foofoo',
      })

      expect(page).not.toBeUndefined()
      expect(page.url).toBe('/en/settling-in-finland')
      expect(noPage).toBeUndefined()
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
