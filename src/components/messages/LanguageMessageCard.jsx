import { useUpdateAtom } from 'jotai/utils'
import { languageMenuVisibilityAtom } from '@/src/store'
import MessageCard, { MESSAGE_TYPES } from '@/components/messages/MessageCard'
import { useTranslation } from 'next-i18next'
import useLanguageMessage from '@/hooks/useLanguageMessage'

export const LANG_MESSAGE_ID = 'langmessage'
const LanguageMessageCard = () => {
  const { isShownOnce, setShownOnce, isOpen, hideMessage } =
    useLanguageMessage()

  const setLanguageMenu = useUpdateAtom(languageMenuVisibilityAtom)

  const confirm = () => {
    setLanguageMenu(true)
    setShownOnce()
    hideMessage()
  }
  const cancel = () => {
    setShownOnce()
    hideMessage()
  }

  const { t } = useTranslation('common')
  if (isShownOnce) {
    return null
  }

  const messageProps = {
    title: t('languageMessage.title'),
    text: t('languageMessage.text'),
    type: MESSAGE_TYPES.MESSAGE,
    isOpen: isOpen,
    confirm,
    cancel,
    id: LANG_MESSAGE_ID,
  }

  return <MessageCard {...messageProps} />
}

export default LanguageMessageCard
