const findParent = ({ items, parentId }) =>
  items.find(({ id }) => id === parentId)
// TODO tests
export default function useBreadCrumbs({ items, path }) {
  const page = items.find(({ url }) => url === path)
  const breadcrumbs = [page]
  if (page.parent === '') {
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
