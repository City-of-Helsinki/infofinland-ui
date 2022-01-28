import { useAtom } from 'jotai'
import { languageMenuVisibilityAtom } from '../store'

const useLanguageMenuToggle = () => {
  return useAtom(languageMenuVisibilityAtom)
}

export default useLanguageMenuToggle
