import { useRouter } from 'next/router'

const SEARCH_PAGE = '/hae'

const useSearchRoute = ({ q, onSubmit }) => {
  const { push } = useRouter()
  const goToSearch = (e) => {
    e.preventDefault()
    push({
      pathname: SEARCH_PAGE,
      query: { q },
    })
    onSubmit && onSubmit()
  }

  return goToSearch
}
export default useSearchRoute
