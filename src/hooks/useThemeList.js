//TODO tests
import { findTheme } from '@/lib/menu-utils'
export default function useThemeList({ tree, path }) {
  const theme = findTheme({ tree, path })
  if (!theme || !theme.items) {
    return []
  } else {
    return theme.items
  }
  // return tree.find(
  //   ({ url, items }) => url === path && typeof items !== 'undefined'
  // )?.items
}