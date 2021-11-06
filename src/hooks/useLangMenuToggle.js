import { useAtom } from 'jotai'
import { languageMenuVisibility } from '../store'

const useLanguageMenuToggle = () => {
  return useAtom(languageMenuVisibility)
}

export default useLanguageMenuToggle
