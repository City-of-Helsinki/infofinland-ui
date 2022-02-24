import { useAtom } from 'jotai'
import { languageMessageIsOpenAtom } from '../store'
import { i18n } from '../../next-i18next.config'
import { isSSR } from './useIsomorphicLayoutEffect'
const SESSION_KEY = 'langMessage'
const SHOWN = 'shown'
const NOT_SHOWN = 'not_shown'

const useLanguageMessage = () => {
  const [isOpen, setIsOpen] = useAtom(languageMessageIsOpenAtom)
  let userHasClosedMessage = NOT_SHOWN

  if (typeof sessionStorage !== 'undefined') {
    userHasClosedMessage = sessionStorage.getItem(SESSION_KEY)
  }

  const showMessage = () => {
    setIsOpen(true)
  }

  const hideMessage = () => {
    setIsOpen(false)
  }

  const userLocale =
    isSSR() === false ? navigator.languages[0].split('-').shift() : undefined

  const setShownOnce = () => {
    sessionStorage.setItem(SESSION_KEY, SHOWN)
  }

  return {
    showMessage,
    hideMessage,
    setShownOnce,
    isOpen,
    isShownOnce: userHasClosedMessage === SHOWN,
    userLocale,
    locales: i18n.locales,
  }
}

export default useLanguageMessage
