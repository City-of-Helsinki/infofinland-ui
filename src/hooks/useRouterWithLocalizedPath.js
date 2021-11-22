import { useRouter } from 'next/router'

export default function useRouterWithLocalizedPath() {
  const router = useRouter()
  const { asPath, locale } = router
  const localePath = `/${locale}${asPath}`
  return { localePath, ...router }
}
