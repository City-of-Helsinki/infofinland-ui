import { SecondaryLayout } from '@/components/layout/Layout'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import ContentMapper from '@/components/article/ContentMapper'
import CookieConsentForm from '@/components/layout/CookieConsentForm'
import Block from '@/components/layout/Block'
import { H1 } from '@/components/Typo'
export default function AboutPage({ node }) {
  const { locale, asPath } = useRouter()
  const { field_content, title } = node
  const { COOKIE_PAGE_PATH } = getConfig().publicRuntimeConfig
  const isCookiePage = new RegExp(COOKIE_PAGE_PATH).test(asPath)

  return (
    <SecondaryLayout node={node}>
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
