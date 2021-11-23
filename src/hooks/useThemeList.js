// TODO tests

export default function useThemeList({ tree, path }) {
  return tree.find(
    ({ url, items }) => url === path && typeof items !== 'undefined'
  )?.items
}
