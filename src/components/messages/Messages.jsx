import cls from 'classnames'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import AlertMessages from '@/components/messages/AlertMessages'

const Messages = () => {
  return (
    <div className={cls('bg-gray-lighter grid grid-colums-1 ifu-messages')}>
      <LanguageMessageCard />
      <AlertMessages />
    </div>
  )
}

export default Messages
