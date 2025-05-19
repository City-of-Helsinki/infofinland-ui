import { useRouter } from 'next/router'

export default function useRouterWithLocalizedPath() {
  const router = useRouter()
  const { asPath, locale } = router
  const localePath = `/${locale}${asPath}`.split('?').shift().split('#').shift()

  return { localePath, ...router }
}
