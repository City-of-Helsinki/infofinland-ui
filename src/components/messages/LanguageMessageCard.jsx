import { useAtom } from 'jotai'
import { languageMenuVisibility } from '@/components/app/atoms'
import useLanguageMessage from '@/hooks/useLanguageMessage'
import MessageCard, { MESSAGE_TYPES } from '@/components/messages/MessageCard'
import useTranslation from 'next-translate/useTranslation'

const LanguageMessageCard = () => {
  const { hideMessage, setShownOnce, isShownOnce, isOpen } =
    useLanguageMessage()

  const [, setLanguageMenu] = useAtom(languageMenuVisibility)
  const confirm = () => {
    setLanguageMenu(true)
    setShownOnce()
  }
  const { t } = useTranslation('common')

  const messageProps = {
    title: t('languageMessage.title'),
    text: t('languageMessage.text'),
    type: MESSAGE_TYPES.MESSAGE,
    isOpen: !isShownOnce && isOpen,
    confirm,
    cancel: setShownOnce,
    onClose: hideMessage,
  }

  return <MessageCard {...messageProps} />
}

export default LanguageMessageCard
