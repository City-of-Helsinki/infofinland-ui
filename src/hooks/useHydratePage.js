import { useHydrateAtoms } from 'jotai/utils'
import { useSetAtom } from 'jotai'
import { pageAtom, cookieConsentAtom, selectedCityIdAtom } from '@/src/store'
import { useEffect } from 'react'

const useHydratePage = (pageProps) => {
  useHydrateAtoms([
    [pageAtom, pageProps],
    [cookieConsentAtom, undefined],
    [selectedCityIdAtom, undefined],
  ])

  const setPage = useSetAtom(pageAtom)

  useEffect(() => {
    setPage(pageProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps])
}

export default useHydratePage
