import { findParent } from '@/lib/menu-utils'
import { useAtomValue } from 'jotai/utils'
import { menusAtom } from '../store'
// TODO tests
export default function useBreadCrumbs({ items, path }) {
  const menus = useAtomValue(menusAtom)
  const page = items.find(({ url }) => url === path)
  const breadcrumbs = [page]
  //Cringe :(
  if (!page) {
    return []
  }

  if (page?.parent === '') {
    return breadcrumbs
  }
  let parentItem = findParent({ items, parentId: page.parent })
  if (parentItem) {
    breadcrumbs.push(parentItem)
    while (parentItem.parent !== '') {
      parentItem = findParent({ items, parentId: parentItem.parent })
      breadcrumbs.push(parentItem)
    }
  }

  return breadcrumbs.reverse()
}
