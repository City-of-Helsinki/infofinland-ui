import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { messagesAtom, shownMessagesAtom } from '@/src/store'
import { keys } from 'lodash'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'

const Messages = () => {
  const { t } = useTranslation('common')
  const messages = useAtomValue(messagesAtom)
  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)

  return (
    <section
      aria-label={t('messages.title')}
      className="grid bg-gray-lighter border-b border-gray-lighter grid-colums-1 ifu-messages"
    >
      <LanguageMessageCard />
      {messages?.map(({ body, title, field_message_type, id }) => {
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
