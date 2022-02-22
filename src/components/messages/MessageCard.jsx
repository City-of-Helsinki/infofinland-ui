import cls from 'classnames'
export const MESSAGE_TYPES = {
  MESSAGE: 'notice',
  WARNING: 'warning',
}

import { keys } from 'lodash'
import { CSSTransition } from 'react-transition-group'
import { useAtom } from 'jotai'

import { useTranslation } from 'next-i18next'
import ParseHtml from '../ParseHtml'
import { shownMessagesAtom } from '@/src/store'

const MessageButton = ({ cancel, confirm, onClick }) => {
  const { t } = useTranslation('common')
  const text = cancel
    ? t('buttons.no')
    : confirm
    ? t('buttons.yes')
    : t('buttons.close')
  return (
    <button
      className="text-tiny font-bold hover:underline uppercase"
      onClick={onClick}
      title={text}
    >
      <span className="px-3">{text}</span>
    </button>
  )
}

const MessageCard = ({
  title,
  body,
  text,
  confirm = () => null,
  cancel,
  type,
  isOpen,
  id,
}) => {
  const handleConfirm = () => {
    setShownMessages({ ...shownMessages, [id]: true })
    confirm && confirm()
  }

  const handleCancel = () => {
    setShownMessages({ ...shownMessages, [id]: true })
    cancel && cancel()
  }

  const [shownMessages, setShownMessages] = useAtom(shownMessagesAtom)

  return (
    <CSSTransition
      classNames={{
        appear: 'ifu-messages__card--appear',
        appearActive: 'ifu-messages__card--appear-active',
        appearDone: 'ifu-messages__card--appear-done',
        enter: 'ifu-messages__card--enter',
        enterActive: 'ifu-messages__card--enter-active',
        enterDone: 'ifu-messages__card--enter-done',
        exit: 'ifu-messages__card--exit',
        exitActive: 'ifu-messages__card--exit-active',
        exitDone: 'ifu-messages__card--exit-done',
      }}
      timeout={{ appear: 0, enter: 500, exit: 200 }}
      in={isOpen || !keys(shownMessages).includes(id)}
      appear
      unmountOnExit
      mountOnEnter
    >
      <section className={cls('bg-gray-lighter')}>
        <div className=" flex my-2 bg-white rounded shadow-md me-2 ms-2">
          <div
            className={cls('w-2 flex-none rounded-s ', {
              'bg-neon-green': type === MESSAGE_TYPES.MESSAGE,
              'bg-neon-pink': type === MESSAGE_TYPES.WARNING,
              // 'bg-neon-yellow': type === MESSAGE_TYPES.WARNING,
            })}
          />
          <div className=" flex flex-col flex-1 flex-grow p-4 min-h-card ifu-messages__card-body">
            <h2 className="flex-none mb-2 text-message font-bold">{title}</h2>
            {text && <div className=" text-message">{text}</div>}
            {body && (
              <div className=" text-message">
                <ParseHtml html={body?.processed} />
              </div>
            )}
            <div className="mt-2 text-right">
              {!cancel && <MessageButton onClick={handleConfirm} />}
              {cancel && <MessageButton onClick={handleCancel} cancel />}
              {cancel && <MessageButton onClick={handleConfirm} confirm />}
            </div>
          </div>
        </div>
      </section>
    </CSSTransition>
  )
}

export default MessageCard
