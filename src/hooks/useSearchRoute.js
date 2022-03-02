import { useRouter } from 'next/router'

export const SEARCH_PAGE = '/search'

const useSearchRoute = ({ search, onSubmit }) => {
  const { push } = useRouter()
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
