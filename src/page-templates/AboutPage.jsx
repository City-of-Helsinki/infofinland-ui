import { SecondaryLayout } from '@/components/layout/Layout'
import { useAtomValue } from 'jotai/utils'
import { nodeAtom } from '@/src/store'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import ContentMapper from '@/components/article/ContentMapper'
import CookieConsentForm from '@/components/layout/CookieConsentForm'
import Block from '@/components/layout/Block'
import { H1 } from '@/components/Typo'
export default function AboutPage() {
  const { locale, asPath } = useRouter()
  const { field_content, title } = useAtomValue(nodeAtom)
  const { COOKIE_PAGE_PATH } = getConfig().publicRuntimeConfig
  const isCookiePage = asPath === COOKIE_PAGE_PATH
  return (
    <SecondaryLayout>
      <Block>
        <H1 className="mt-16 mb-10">{title}</H1>
      </Block>
      {field_content?.length > 0 && (
        <ContentMapper content={field_content} locale={locale} />
      )}
      {isCookiePage && <CookieConsentForm />}
    </SecondaryLayout>
  )
}
