import { useAtom } from 'jotai'
import { languageMessageIsOpen } from '../store'
import { i18n } from '../../next-i18next.config'
const SESSION_KEY = 'langMessage'
const SHOWN = 'shown'
const NOT_SHOWN = 'not_shown'

const useLanguageMessage = () => {
  const [isOpen, setIsOpen] = useAtom(languageMessageIsOpen)
  let userHasClosedMessage = NOT_SHOWN

  if (typeof sessionStorage !== 'undefined') {
    userHasClosedMessage = sessionStorage.getItem(SESSION_KEY)
  }

  const showMessage = () => setIsOpen(true)
  const hideMessage = () => setIsOpen(false)

  const userLocale =
    typeof window !== 'undefined'
      ? navigator.languages[0].split('-').shift()
      : undefined

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
