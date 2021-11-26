export const findParent = ({ items, parentId }) =>
  items.find(({ id }) => id === parentId)

export const findTheme = ({ tree, path }) =>
  tree.find(({ url }) => url === path)

export const getThemes = ({ items }) =>
  items.filter(({ parent }) => parent === '')

export const findPageByPath = ({ items, path }) =>
  items.find(({ url }) => url === path)

export const findRootForPath = ({ items, path }) => {
  console.log({ path })
  const page = findPageByPath({ items, path })
  if (!page) {
    return
  }
  const { parent } = page
  if (parent === '') {
    return page
  }
  let parentItem = findParent({ items, parentId: page.parent })
  // hmmm....this will crash if there is a circular parent reference in menu items. Not sure if this is possible.
  while (parentItem.parent !== '') {
    parentItem = findParent({ items, parentId: parentItem.parent })
  }

  return parentItem
}
