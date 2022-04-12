export const findParent = ({ items, parentId }) =>
  items?.find(({ id }) => id === parentId)

export const findTheme = ({ tree, path }) =>
  tree?.find(({ url }) => url === path)

export const isRootPage = ({ tree, path }) =>
  !!tree?.find(({ url }) => url === path)

export const getRootPages = (items) =>
  items?.filter(({ parent }) => parent === '')

export const findPageByPath = ({ items, path }) =>
  items?.find(({ url }) => url === path)

export const findRootForPath = ({ items, path, root = '' }) => {
  const page = findPageByPath({ items, path })
  if (!page) {
    return
  }
  const { parent } = page
  if (parent === '') {
    return page
  }
  let parentItem = findParent({ items, parentId: page.parent })

  if (!parentItem) {
    return page
  }
  // hmmm....this will crash if there is a circular parent reference in menu items. Not sure if this is possible.
  while (parentItem.parent !== root) {
    parentItem = findParent({ items, parentId: parentItem.parent })
  }

  return parentItem
}
