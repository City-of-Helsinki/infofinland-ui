import cls from 'classnames'
import LanguageMessageCard from './LanguageMessageCard'
import AlertMessages from './AlertMessages'

const Messages = () => {
  return (
    <div className={cls('bg-gray-lighter grid grid-colums-1 ifu-messages')}>
      <LanguageMessageCard />
      <AlertMessages />
    </div>
  )
}

export default Messages
