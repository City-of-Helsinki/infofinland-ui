import { useAtom } from 'jotai'
import { languageMenuVisibilityAtom} from '../store'

const useLanguageMenuToggle = () => {
  return useAtom(languageMenuVisibility)
}

export default useLanguageMenuToggle
