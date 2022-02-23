import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import useLanguageMessage from './useLanguageMessage'

export default function useShowLangMessage(locale) {
  const { showMessage, hideMessage, userLocale, locales } = useLanguageMessage()
  // Show Language message if route's locale doe1s not match user agent locale
  useIsomorphicLayoutEffect(() => {
    if (userLocale !== locale && locales.includes(userLocale)) {
      showMessage()
    } else {
      hideMessage()
    }
    // jotai hook methods do not need to be passed to useEffect.
    // Doing so will cause an infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])
}
