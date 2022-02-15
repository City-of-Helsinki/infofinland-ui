import cls from 'classnames'
import LanguageMessageCard from '@/components/messages/LanguageMessageCard'
import AlertMessages from '@/components/messages/AlertMessages'
import { useTranslation } from 'next-i18next'

const Messages = () => {
  const { t } = useTranslation('common')
  return (
    <section
      aria-label={t('messages.title')}
      className={cls('bg-gray-lighter grid grid-colums-1 ifu-messages')}
    >
      <LanguageMessageCard />
      <AlertMessages />
    </section>
  )
}

export default Messages
