import { useAtom } from 'jotai'
import MessageCard, { MESSAGE_TYPES } from './MessageCard'
import {
  // alertMessages,
  alertMessageAtoms,
} from '../app/atoms'

const AlertMessage = ({ atom }) => {
  const [message, setMessage] = useAtom(atom)
  const { confirm: _confirm, title, text, cancel: _cancel } = message

  const confirm = () => {
    _confirm && _confirm()
  }
  const cancel = () => {
    _cancel && _cancel()
  }
  const onClose = () => setMessage({ waiting: false })
  const messageProps = {
    title,
    text,
    type: MESSAGE_TYPES.ALERT,
    isOpen: message.waiting,
    confirm,
    cancel,
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
