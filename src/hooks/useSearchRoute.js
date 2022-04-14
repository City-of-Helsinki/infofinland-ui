import { useRouter } from 'next/router'

export const SEARCH_PAGE = '/search'

const useSearchRoute = ({ search, onSubmit }) => {
  const { push } = useRouter()

  // dont submit empty search term
  if (search?.trim().length < 1) {
    return (e) => {
      e.preventDefault()
      return false
    }
  }

  const goToSearch = (e) => {
    e.preventDefault()
    const languages = [...e.target.querySelectorAll('input:checked')].map(
      ({ value }) => value
    )
    push({
      pathname: SEARCH_PAGE,
      query: { search: search.trim(), languages },
    })
    onSubmit && onSubmit()
  }

  return goToSearch
}
export default useSearchRoute
