import cls from 'classnames'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'

import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { messagesAtom } from '@/src/store'

const Messages = () => {
  const { t } = useTranslation('common')
  const messages = useAtomValue(messagesAtom)
  return (
    <section
      aria-label={t('messages.title')}
      className={cls(
        'bg-gray-lighter grid grid-colums-1 ifu-messages border-b border-gray-lighter'
      )}
    >
      <LanguageMessageCard />
      {messages.map(({ body, title, field_message_type, id }) => {
        return (
          <MessageCard
            key={`message-${id}`}
            type={field_message_type}
            title={title}
            body={body}
            id={id}
          />
        )
      })}
    </section>
  )
}

export default Messages
