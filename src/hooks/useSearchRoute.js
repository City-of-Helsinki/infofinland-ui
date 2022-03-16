import { useRouter } from 'next/router'

export const SEARCH_PAGE = '/search'

const useSearchRoute = ({ search, onSubmit }) => {
  const { push } = useRouter()

  // dont submit empty search term
  if (search?.length < 1) {
    return (e) => {
      e.preventDefault()
      return false
    }
  }

  const goToSearch = (e) => {
    e.preventDefault()
    push({
      pathname: SEARCH_PAGE,
      query: { search },
    })
    onSubmit && onSubmit()
  }

  return goToSearch
}
export default useSearchRoute
