import { useAtom } from 'jotai'
import { languageMessageIsOpen } from '../components/app/atoms'
import { locales, fallbackLocale } from '../../i18n'
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
    locales,
    fallbackLocale,
  }
}

export default useLanguageMessage
