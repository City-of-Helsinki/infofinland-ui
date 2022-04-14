import { SecondaryLayout } from '@/components/layout/Layout'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import ContentMapper from '@/components/article/ContentMapper'
import CookieConsentForm from '@/components/layout/CookieConsentForm'
import Block from '@/components/layout/Block'
import { H1, longTextClass } from '@/components/Typo'
import cls from 'classnames'
import CommonHead from '@/components/layout/CommonHead'

export default function AboutPage({ node }) {
  const { locale, asPath } = useRouter()
  const { field_content, title, field_description } = node
  const { COOKIE_PAGE_PATH } = getConfig().publicRuntimeConfig
  const isCookiePage = new RegExp(COOKIE_PAGE_PATH).test(asPath)

  return (
    <>
      <CommonHead key={`head-about-${node?.id}`} node={node} />
      <SecondaryLayout node={node}>
        <Block>
          <H1
            className={cls(
              'mt-16 mb-10',
              longTextClass(title, {
                size: 16,
                classes: [
                  ' text-h1 lg:text-h1xl',
                  'text-[2rem] lg:text-h1xl font-bold lg:font-normal',
                ],
              })
            )}
          >
            {title}
          </H1>
        </Block>
        {field_description && <Block>{field_description}</Block>}
        {field_content?.length > 0 && (
          <ContentMapper content={field_content} locale={locale} />
        )}
        {isCookiePage && <CookieConsentForm />}
      </SecondaryLayout>
    </>
  )
}
