import { useState, useEffect, useRef, forwardRef } from 'react'
import cls from 'classnames'
import { useTranslation } from 'next-i18next'
import { IconExclamationBubble } from '@/components/Icons'
import Button, { LinkButton } from '@/components/Button'
import { useForm } from 'react-hook-form'
import InfoBlock from '@/components/feedback/InfoBlock'
import { CSSTransition } from 'react-transition-group'
import { longTextClass } from '@/components/Typo'
import { isSSR } from '@/hooks/useIsomorphicLayoutEffect'
import { IconAngleDown } from '../Icons'
import axios from 'axios'
import { feedbackEmailAtom } from '@/src/store'
import { useAtomValue } from 'jotai/utils'
// eslint-disable-next-line react/display-name
const FeedbackForm = forwardRef(({ onCancel }, ref) => {
  const { t } = useTranslation('common')
  const feedbackEmail = useAtomValue(feedbackEmailAtom)
  const pageUrl = isSSR() === false ? window.location.href : ''
  const {
    register,
    reset,

    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    handleSubmit,
  } = useForm()

  const onSubmit = async (data) =>
    axios.post('/api/feedback', { ...data, feedback_email: feedbackEmail })

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
        <h3 className="mt-8 mb-4 font-sans text-h2 text-bodytext-color">
          {t('feedback.title')}
        </h3>

        <p className="mb-8 text-gray-dark break-words">
          <b>{t('feedback.urlLabel')}:</b> {pageUrl}
        </p>
      </div>
      <div className="xl:grid grid-cols-2 gap-x-8">
        <InfoBlock />
        <div ref={scrollTarget}>
          {!isSubmitting && isSubmitted && !isSubmitSuccessful && (
            <p className="flex items-center py-2 pb-4 mt-8 md:mt-0 mb-4 font-sans text-body-small font-bold text-bodytext-color bg-white rounded border-l-5 border-neon-pink lg:min-h-[4rem] ps-4">
              <span className="inline-block">{t('feedback.states.fail')}</span>
            </p>
          )}

          {!isSubmitting && isSubmitted && isSubmitSuccessful && (
            <p className="flex items-center py-2 pb-4 mt-8 md:mt-0 mb-4 font-sans text-body-small font-bold text-bodytext-color bg-white rounded border-l-5 border-neon-green lg:min-h-[4rem] ps-4">
              <span className="inline-block">
                {t('feedback.states.success')}
              </span>
            </p>
          )}

          {isSubmitting && (
            <p className="flex items-center py-2 pb-4 mt-8 md:mt-0 mb-4 font-sans text-body-small font-bold text-bodytext-color bg-white rounded border-l-5 border-blue lg:min-h-[4rem] ps-4">
              <span className="inline-block">
                {t('feedback.states.submitting')}
              </span>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <input type="hidden" {...register('page')} value={pageUrl} />
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
                className="ifu-feedback__input"
                disable={isSubmitting}
                {...register('name', { required: true })}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="ifu-feedback-email"
                className="flex mb-1 text-tight"
              >
                <div className="flex-grow"> {t('feedback.labels.email')}</div>
                {errors.sender_email && (
                  <div className="flex-none text-tight font-bold text-neon-red break-all">
                    {t('feedback.states.invalid')}
                  </div>
                )}
              </label>
              <input
                type="email"
                id="ifu-feedback-email"
                aria-required="true"
                disable={isSubmitting}
                className="ifu-feedback__input"
                {...register('sender_email', {
                  required: true,
                })}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="ifu-feedback-message"
                className="flex mb-1 text-tight"
              >
                <div className="flex-grow">{t('feedback.labels.feedback')}</div>
                {errors.message && (
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
                className="ifu-feedback__input"
                disable={isSubmitting}
                {...register('message', { required: true })}
              ></textarea>
            </div>
            <div className="mb-16">
              {(!isSubmitted || !isSubmitSuccessful) && (
                <Button
                  type="submit"
                  value="ok"
                  className="me-2"
                  disable={isSubmitting}
                >
                  {t('feedback.buttons.send')}
                </Button>
              )}

              {isSubmitted && isSubmitSuccessful && (
                <Button onClick={() => reset()} className="me-2" type="button">
                  {t('feedback.buttons.sendAgain')}
                </Button>
              )}
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

export default FeedbackButtonBlock
