import { useHydrateAtoms, useUpdateAtom } from 'jotai/utils'
import { pageAtom } from '@/src/store'
import { useEffect } from 'react'

const useHydratePage = (pageProps) => {
  useHydrateAtoms([[pageAtom, pageProps]])
  const setPage = useUpdateAtom(pageAtom)

  useEffect(() => {
    setPage(pageProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps])
}

export default useHydratePage
