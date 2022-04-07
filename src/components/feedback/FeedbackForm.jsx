import { useEffect, useRef, forwardRef } from 'react'
import { useTranslation } from 'next-i18next'
import Button, { LinkButton } from '@/components/Button'
import { useForm } from 'react-hook-form'
import InfoBlock from '@/components/feedback/InfoBlock'
import { isSSR } from '@/hooks/useIsomorphicLayoutEffect'
import axios from 'axios'
import { feedbackEmailAtom } from '@/src/store'
import { useAtomValue } from 'jotai/utils'

// eslint-disable-next-line react/display-name
const FeedbackForm = forwardRef(({ onCancel }, ref) => {
  // DEV NOTE: needs recomposition.
  // Currently CSSTransition causes useSWR to refetch every time it is opened.
  // Consider using async atom and useAtom hook instead if this becomes a real issue.

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
  const urlWithoutHash = pageUrl.split('#').shift()
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
          <b>{t('feedback.urlLabel')}:</b> {urlWithoutHash}
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
            <input type="hidden" {...register('page')} value={urlWithoutHash} />
            <input
              type="hidden"
              {...register('subject')}
              value={`Palautetta sivusta: ${urlWithoutHash}`}
            />
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
                disable={isSubmitting.toString()}
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
                disable={isSubmitting.toString()}
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
                disable={isSubmitting.toString()}
                {...register('message', { required: true })}
              ></textarea>
            </div>
            <div className="mb-16">
              {(!isSubmitted || !isSubmitSuccessful) && (
                <Button
                  type="submit"
                  value="ok"
                  className="me-2"
                  disable={isSubmitting.toString()}
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

export default FeedbackForm
