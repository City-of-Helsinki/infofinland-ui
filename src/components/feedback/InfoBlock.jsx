import cls from 'classnames'
import ParseHtml from '../ParseHtml'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getFeedbackContent } from '@/lib/client-api'
import times from 'lodash/times'

const Loader = () => (
  <div>
    {times(6, (i) => (
      <p
        className="mb-6 h-8 bg-blue-lighter rounded animate-pulse"
        key={`feedback-loader-${i}`}
      ></p>
    ))}
  </div>
)

const InfoBlock = () => {
  // const { field_content } = useAtomValue(feedbackPageAtom) || []
  const { locale } = useRouter()
  const { data, error, isValidating } = useSWR(`/feedbackpage/${locale}`, () =>
    getFeedbackContent(locale)
  )

  return (
    <div className={cls('mt-8 xl:mt-0 text-body-small')}>
      {isValidating && <Loader />}
      {!isValidating &&
        !error &&
        data?.field_content?.map(({ field_text, id }) => {
          if (!field_text?.processed) {
            return null
          }
          return (
            <ParseHtml
              html={field_text?.processed}
              key={`feedback-info-${id}`}
            />
          )
        })}
    </div>
  )
}

export default InfoBlock
