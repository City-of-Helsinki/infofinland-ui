import { findParent } from '@/lib/menu-utils'

export default function useBreadCrumbs({ items, path }) {
  const page = items.find(({ url }) => url === path)
  if (!page) {
    return []
  }

  const breadcrumbs = [page]

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
