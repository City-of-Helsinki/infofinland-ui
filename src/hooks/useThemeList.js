//TODO tests

export default function useThemeList({ tree, path }) {
  const theme = tree.find(({ url }) => url === path)
  if (!theme['items']) {
    return []
  } else {
    return theme.items
  }
  // return tree.find(
  //   ({ url, items }) => url === path && typeof items !== 'undefined'
  // )?.items
}
