import { useAtom, useAtomValue } from 'jotai'
import { useTranslation } from 'next-i18next'
import { nodeIdAtom, shownMessagesAtom } from '@/src/store'
import keys from 'lodash/keys'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'
import useSWR from 'swr'
import { getMessages } from '@/lib/client-api'
import { useRouter } from 'next/router'
import { IconExclamationCircle } from '../Icons'
import { useEffect } from 'react'
import { useRef } from 'react'
import every from 'lodash/every'
// import { DotsLoader } from '../Loaders'

const Error = ({ message }) => (
  <p className="flex items-center px-2 text-body-small text-red opacity-75">
    <IconExclamationCircle className="h-4 fill-red" />
    {message}
  </p>
)

// const Loading = () => <p className="border-blue border-l-8 mx-2 rounded px-4 h-32 bg-white flex items-center"> <DotsLoader/></p>

const Messages = () => {
  const { t } = useTranslation('common')
  const id = useAtomValue(nodeIdAtom)
  const { locale, asPath } = useRouter()
  const fetcher = () => getMessages({ id, locale })
  const { data, error, isValidating } = useSWR(
    `/${locale}/${id || asPath}`,
    fetcher
  )
  const scrollRef = useRef(null)
  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)
  const messageIds = data?.map(({ id }) => id) || []
  const hasMessages =
    data?.length > 0 &&
    every(keys(shownMessages), (shownId) => !messageIds.includes(shownId))

  useEffect(() => {
    hasMessages &&
      scrollRef.current?.scrollIntoView({
        behaviour: 'smooth',
        block: 'start',
      })
  }, [hasMessages, scrollRef])

  return (
    <section
      ref={scrollRef}
      aria-label={t('messages.title')}
      className="grid bg-gray-lighter border-b border-gray-lighter grid-colums-1 ifu-messages"
    >
      <LanguageMessageCard />

      {/* {isValidating &&  <Loading />} */}
      {!isValidating && !data && error && (
        <Error message={t('messages.error')} />
      )}
      {data?.map(({ body, title, field_message_type, id }) => {
        const close = () => setShownMessages({ ...shownMessages, [id]: true })
        return (
          <MessageCard
            key={`message-${id}`}
            type={field_message_type}
            title={title}
            onClose={close}
            isOpen={!keys(shownMessages).includes(id)}
            body={body}
            confirm={close}
            id={id}
          />
        )
      })}
    </section>
  )
}

export default Messages
