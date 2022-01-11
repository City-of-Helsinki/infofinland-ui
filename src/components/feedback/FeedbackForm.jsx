import { useState, useEffect, useRef, forwardRef } from 'react'
import cls from 'classnames'

import { useTranslation } from 'next-i18next'
import { IconExclamationBubble, IconAngleUp } from '@/components/Icons'
import { HERO_MARGIN } from '@/components/layout/Block'
import Button, { LinkButton } from '@/components/Button'
import { useForm } from 'react-hook-form'
import InfoBlock from '@/components/feedback/InfoBlock'
import SubmitLoader from '@/components/feedback/SubmitLoader'
import { CSSTransition } from 'react-transition-group'
import { IconExclamationCircle } from '@/components/Icons'
import { longTextClass } from '@/components/Typo'

const INPUT_CLASS =
  'py-2 px-3 w-full block border-black border rounded shadow-input text-body-small'

// eslint-disable-next-line react/display-name
const FeedbackForm = forwardRef(({ onCancel }, ref) => {
  const { t } = useTranslation('common')
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const {
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    return new Promise((ok, fail) => {
      const action = data.fail ? fail : ok
      setTimeout(action, 1500)
    })
  }

  const onError = (errors, e) => {
    console.error({ errors, e })
  }

  useEffect(() => {
    if (!isSubmitSuccessful && scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ block: 'center' })
    }
  }, [isSubmitSuccessful, isSubmitting, scrollTarget])

  const scrollTarget = useRef()

  return (
    <div className="block mb-16 border-t border-gray-darker-op2">
      <div
        className="text-body-small border-b xl:border-b-0 border-gray-darker-op2"
        ref={ref}
      >
        {!isSubmitting && (
          <h3 className="mt-8 mb-4 font-sans text-h2 text-bodytext-color">
            {t('feedback.title')}
          </h3>
        )}
        {isSubmitting && (
          <h3 className="my-6 text-h3">{t('feedback.states.submitting')}</h3>
        )}

        {isSubmitSuccessful && (
          <h3 className="my-6 text-h3">{t('feedback.states.success')}</h3>
        )}

        {isSubmitting && <SubmitLoader />}

        <p className="mb-8 text-gray-dark break-words">
          <b>{t('feedback.urlLabel')}:</b> {pageUrl}
        </p>
      </div>
      <div className="xl:grid grid-cols-2 gap-x-8">
        <InfoBlock {...{ isSubmitSuccessful, isSubmitted, isSubmitting }} />
        <div className="">
          {!isSubmitting && isSubmitted && !isSubmitSuccessful && (
            <p
              ref={scrollTarget}
              className="flex items-center pb-4 mt-8 md:mt-0 font-sans text-body font-bold text-bodytext-color lg:border-b-0 border-gray-darker-op2"
            >
              <IconExclamationCircle className="inline-block flex-none text-neon-pink fill-current me-4" />
              <span className="inline-block">{t('feedback.states.fail')}</span>
            </p>
          )}

          <form
            className={cls({
              hidden: isSubmitting || isSubmitSuccessful,
            })}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <input type="hidden" {...register('url')} value={pageUrl} />

            <div className="mb-2">
              <label
                htmlFor="ifu-feedback-name"
                className="flex mb-1 text-tight"
              >
                <div className="flex-grow">{t('feedback.labels.name')}</div>
                {errors.name && (
                  <div className="flex-none text-tight font-bold text-neon-red">
                    {t('feedback.states.invalid')}
                  </div>
                )}
              </label>
              <input
                type="text"
                aria-required="true"
                id="ifu-feedback-name"
                className={cls(INPUT_CLASS)}
                {...register('name', { required: true })}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="ifu-feedback-email"
                className="flex mb-1 text-tight"
              >
                <div className="flex-grow"> {t('feedback.labels.email')}</div>
                {errors.email && (
                  <div className="flex-none text-tight font-bold text-neon-red break-all">
                    {t('feedback.states.invalid')}
                  </div>
                )}
              </label>
              <input
                type="text"
                id="ifu-feedback-email"
                aria-required="true"
                className={cls(INPUT_CLASS)}
                {...register('email', {
                  required: true,

                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    // message: "invalid email address"
                  },
                })}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="ifu-feedback-message"
                className="flex mb-1 text-tight"
              >
                <div className="flex-grow">{t('feedback.labels.feedback')}</div>
                {errors.feedback && (
                  <div className="flex-none text-tight font-bold text-neon-red">
                    {t('feedback.states.invalid')}
                  </div>
                )}
              </label>
              <textarea
                id="ifu-feedback-message"
                cols="30"
                rows="6"
                aria-required="true"
                className={cls(INPUT_CLASS)}
                {...register('feedback', { required: true })}
              ></textarea>
            </div>
            <div className="mb-16">
              <Button type="submit" value="ok" className="me-2">
                {t('feedback.buttons.send')}
              </Button>
              <LinkButton
                onClick={onCancel}
                type="button"
                className="float-right"
              >
                {t('feedback.buttons.close')}
              </LinkButton>
            </div>
          </form>
        </div>
      </div>
      {isSubmitSuccessful && (
        <div className="lg:flex gap-x-4 items-center mb-16 lg:border-t border-gray-darker-op2">
          <div className="mt-8 lg:mt-0">
            <Button onClick={() => reset()} className="mt-4 me-6">
              {t('feedback.buttons.sendAgain')}
            </Button>
            <LinkButton onClick={() => onCancel()} className="mt-4">
              {t('feedback.buttons.close')}
            </LinkButton>
          </div>
        </div>
      )}
    </div>
  )
})

const FeedbackButtonBlock = () => {
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
            {isOpen && (
              <IconAngleUp className="fill-link h-6-w-6 ms-2" />
            )}
          </span>
        </button>
      </div>

      <div className={cls(HERO_MARGIN, 'overflow-hidden')}>
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

export default FeedbackButtonBlock
