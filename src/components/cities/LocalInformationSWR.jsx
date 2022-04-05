import { useAtomValue } from 'jotai/utils'
import { CSSTransition } from 'react-transition-group'
import { getLinks } from '@/lib/ssr-helpers'
import TextLink from '../TextLink'
import { DotsLoader } from '../Loaders'
import { IconExclamationCircle } from '../Icons'
import { ContactInfoFields } from '../article/PTVBlock'
import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'
import { ExternalLinkCollection } from '../article/ReadMoreBlock'
import ParseHtml from '@/components/ParseHtml'
import { getLocalInformation } from '@/lib/client-api'
import { nodeIdAtom } from '@/src/store'

const useLocalInformation = ({ city, id }) => {
  const cacheKey = !city ? null : `${city}-${id}`
  const fetcher = !city ? () => {} : () => getLocalInformation({ id, city })
  const { data, error } = useSWR(cacheKey, fetcher)

  return {
    node: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const SWRContent = ({ city, isOpen }) => {
  const { t } = useTranslation('common')
  const { locale } = useRouterWithLocalizedPath()
  const { node, isLoading, isError } = useLocalInformation({
    city: city?.field_municipality?.name,
    id: city?.field_municipality_page?.id,
  })
  const pageId = useAtomValue(nodeIdAtom)
  const { field_municipality_info, path } = node || {}
  const content = field_municipality_info?.find(
    ({ field_national_page: { id } }) => id === pageId
  )

  return (
    <CSSTransition
      in={isOpen}
      classNames={{
        appear: 'ifu-local-info__content--appear',
        appearActive: 'ifu-local-info__content--appear-active',
        appearDone: 'ifu-local-info__content--appear-done',
        enter: 'ifu-local-info__content--enter',
        enterActive: 'ifu-local-info__content--enter-active',
        enterDone: 'ifu-local-info__content--enter-done',
        exit: 'ifu-local-info__content--exit',
        exitActive: 'ifu-local-info__content--exit-active',
        exitDone: 'ifu-local-info__content--exit-done',
      }}
      mountOnEnter
      unmountOnExit
      timeout={{ appear: 0, enter: 300, exit: 0 }}
    >
      <div className="mt-8">
        {isLoading && (
          <div className="flex items-center h-52">
            <DotsLoader color="green" />
          </div>
        )}
        {isError && (
          <div className="flex items-center h-24">
            <p className="m-auto mb-8 text-center text-gray-medium">
              <IconExclamationCircle className="mb-4 fill-green-light" />
              <br />
              {t('localInfo.error')}
            </p>
          </div>
        )}

        {!isLoading && !isError && content && (
          <>
            {' '}
            {content.field_municipality_info_text?.processed && (
              <ParseHtml
                html={content.field_municipality_info_text?.processed}
                key={`localinfo-text-${content.id}`}
              />
            )}
            {!content.field_municipality_info_text?.processed && (
              <p>{t('localInfo.default_text')}</p>
            )}
            {content?.field_municipality_info_link && (
              <LocalReadMore
                content={getLinks({
                  collection: [content?.field_municipality_info_link],
                  locale,
                })}
              />
            )}
            {content?.field_municipality_info_ptv && (
              <ContactInfoFields {...content?.field_municipality_info_ptv} />
            )}
            <p className="mt-8">
              <TextLink className="font-bold" href={path.alias}>
                {t('localInfo.readMore')}
              </TextLink>
            </p>
          </>
        )}
      </div>
    </CSSTransition>
  )
}

const LocalReadMore = ({ content = [], locale }) => (
  <div className="px-4 my-8 bg-white rounded">
    <ExternalLinkCollection content={content} locale={locale} />
  </div>
)

export default SWRContent
