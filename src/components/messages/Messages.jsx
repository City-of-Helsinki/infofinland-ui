import cls from 'classnames'
import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { messagesAtom, shownMessagesAtom } from '@/src/store'
import { keys } from 'lodash'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'
import { isSSR } from '@/hooks/useIsomorphicLayoutEffect'

const Messages = () => {
  const { t } = useTranslation('common')
  const messages = useAtomValue(messagesAtom)
  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)

  if (isSSR()) {
    //dont render this on server side due to weird render mismatch bug
    return null
  }

  return (
    <section
      aria-label={t('messages.title')}
      className={cls(
        'bg-gray-lighter grid grid-colums-1 ifu-messages border-b border-gray-lighter'
      )}
    >
      <LanguageMessageCard />
      {messages.map(({ body, title, field_message_type, id }) => {
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
