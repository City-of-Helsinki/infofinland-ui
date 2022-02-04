import 'core-js/features/array/at';
import { useRouter } from 'next/router'

export default function useRouterWithLocalizedPath() {
  const router = useRouter()
  const { asPath, locale } = router
  const localePathWithHash = `/${locale}${asPath}`
  const localePath = /#/.test(localePathWithHash)
    ? localePathWithHash.split('#')[0]
    : localePathWithHash
  const hash = localePathWithHash.split('#')[1]
  return { localePath, localePathWithHash, hash, ...router }
}
