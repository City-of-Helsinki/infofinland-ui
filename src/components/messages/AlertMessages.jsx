import { useAtom } from 'jotai'
import MessageCard, { MESSAGE_TYPES } from '@/components/messages/MessageCard'
import { alertMessageAtoms } from '@/src/store'

const AlertMessage = ({ atom }) => {
  const [message, setMessage] = useAtom(atom)
  const { title, text } = message

  const onClose = () => setMessage({ waiting: false })
  const messageProps = {
    title,
    text,
    type: MESSAGE_TYPES.ALERT,
    isOpen: message.waiting,
    onClose,
  }

  return <MessageCard {...messageProps} />
}

const AlertMessages = () => {
  const [messagesAtoms] = useAtom(alertMessageAtoms)
  return (
    <>
      {messagesAtoms.map((atom, i) => (
        <AlertMessage atom={atom} key={`alert-${i}`} />
      ))}
    </>
  )
}

export default AlertMessages
