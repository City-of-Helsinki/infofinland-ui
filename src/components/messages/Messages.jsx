import cls from 'classnames'
import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useAtomValue } from 'jotai/utils'
import { shownMessagesAtom } from '@/src/store'
import { keys } from 'lodash'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import MessageCard from './MessageCard'

import { messageAtoms } from '@/src/store'
// import { MESSAGE_TYPES } from './MessageCard'


const MessageWithAtom = ({atom})=> {
  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)

  const { body, title, field_message_type, id }  = useAtomValue(atom)
  const close = ()=> setShownMessages({...shownMessages,[id]:true})
  return (
    <MessageCard
      type={field_message_type}
      title={title}
      onClose={close}
      isOpen={!keys(shownMessages).includes(id)}
      body={body}
      confirm={close}
      id={id}
    />
  )
}


const Messages = () => {
  const { t } = useTranslation('common')
  const [messagesAsAtoms] = useAtom(messageAtoms)

  return (
    <section
      aria-label={t('messages.title')}
      className={cls(
        'bg-gray-lighter grid grid-colums-1 ifu-messages border-b border-gray-lighter'
      )}
    >
      <LanguageMessageCard />
      {messagesAsAtoms.map((atom) => {
        return (
          <MessageWithAtom atom={atom} key={`message-${atom}`}
          />
        )}
      )}
    </section>
  )
}

export default Messages
