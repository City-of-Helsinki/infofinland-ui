import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { nodeIdAtom, shownMessagesAtom } from '@/src/store'
import { keys } from 'lodash'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'
import useSWR from 'swr'
import { getMessages } from '@/lib/client-api'
import { useRouter } from 'next/router'
import { IconExclamationCircle } from '../Icons'
// import { DotsLoader } from '../Loaders'

const Error = () => (
  <p className="flex items-center px-2 text-body-small text-red opacity-75">
    <IconExclamationCircle className="h-4 fill-red" />
    Could not load messages
  </p>
)

// const Loading = () => <p className="border-blue border-l-8 mx-2 rounded px-4 h-32 bg-white flex items-center"> <DotsLoader/></p>

const Messages = () => {
  const { t } = useTranslation('common')
  const id = useAtomValue(nodeIdAtom)
  const { locale } = useRouter()
  const fetcher = () => getMessages({ id, locale })
  const { data, error, isValidating } = useSWR(`/${locale}/${id}`, fetcher)

  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)

  return (
    <section
      aria-label={t('messages.title')}
      className="grid bg-gray-lighter border-b border-gray-lighter grid-colums-1 ifu-messages"
    >
      <LanguageMessageCard />

      {/* {isValidating &&  <Loading />} */}
      {!isValidating && error && <Error />}
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
