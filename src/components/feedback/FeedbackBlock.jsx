import { useState, useRef } from 'react'
import { IconExclamationBubble } from '@/components/Icons'
import { IconAngleDown } from '../Icons'
import { useTranslation } from 'next-i18next'
import cls from 'classnames'
import FeedbackForm from './FeedbackForm'
import { CSSTransition } from 'react-transition-group'
import { longTextClass } from '@/components/Typo'

const FeedbackBlock = () => {
  const [isOpen, setVisibility] = useState(false)
  const toggle = () => setVisibility(!isOpen)
  const close = () => setVisibility(false)
  const { t } = useTranslation('common')
  const scrollRef = useRef()
  const scrollToForm = () =>
    scrollRef.current?.scrollIntoView({ block: 'center' })

  return (
    <section className="bg-blue-white" id="#feedback">
      <div
        className={cls(
          'px-2 lg:px-0 lg:mx-12 xl:mx-28 2xl:mx-48  3xl:ms-64  3xl:max-w-4xl',
          'h-20'
        )}
      >
        <button
          className="flex items-center w-full h-20"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <IconExclamationBubble className="block mx-4 h-8 transform translate-y-0.5 lg:ms-0 ifu-feedbackbutton__icon" />
          <span
            className={cls(
              'block md:flex-none  font-bold ifu-text-link',
              longTextClass(t('feedback.buttons.open'), {
                size: 32,
                classes: [
                  'text-body-small md:text-body',
                  'text-small md:text-body',
                ],
              })
            )}
          >
            {!isOpen && t('feedback.buttons.open')}
            {isOpen && t('feedback.buttons.close')}
            {isOpen && <IconAngleDown className="fill-link h-6-w-6 ms-2" />}
          </span>
        </button>
      </div>

      <div className="overflow-hidden ifu-block--hero">
        <CSSTransition
          timeout={{ appear: 0, enter: 400, exit: 300 }}
          in={isOpen}
          onEntering={scrollToForm}
          mountOnEnter
          unmountOnExit
          classNames={{
            appear: 'ifu-feedback__form--appear',
            appearActive: 'ifu-feedback__form--appear-active',
            appearDone: 'ifu-feedback__form--appear-done',
            enter: 'ifu-feedback__form--enter',
            enterActive: 'ifu-feedback__form--enter-active',
            enterDone: 'ifu-feedback__form--enter-done',
            exit: 'ifu-feedback__form--exit',
            exitActive: 'ifu-feedback__form--exit-active',
            exitDone: 'ifu-feedback__form--exit-done',
          }}
        >
          <FeedbackForm onCancel={close} ref={scrollRef} />
        </CSSTransition>
      </div>
    </section>
  )
}

export default FeedbackBlock
