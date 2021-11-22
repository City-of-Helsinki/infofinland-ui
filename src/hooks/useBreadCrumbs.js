export default function useBreadCrumbs({ items, path }) {
  let breadcrumbs = []
  // Not the right solution, just testing out. Dont forget to fix this
  const page = items.find(({ url }) => url === path)
  if (page.parent) {
    breadcrumbs = [...items.filter(({ id }) => id === page.parent), page]
  } else {
    breadcrumbs = [page]
  }
  return breadcrumbs
}
