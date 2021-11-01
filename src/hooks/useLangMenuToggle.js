import { useAtom } from 'jotai'
import { languageMenuVisibility } from '../components/app/atoms'

const useLanguageMenuToggle = () => {
  return useAtom(languageMenuVisibility)
}

export default useLanguageMenuToggle
