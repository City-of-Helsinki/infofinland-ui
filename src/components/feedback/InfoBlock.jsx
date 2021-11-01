import useTranslation from 'next-translate/useTranslation'
import cls from 'classnames'

const InfoBlock = ({ isSubmitting, isSubmitted, isSubmitSuccessful }) => {
  const { t } = useTranslation('common')
  return (
    <div
      className={cls('mt-8 xl:mt-0 text-body-small', {
        hidden: isSubmitting,
        'hidden :md:block': isSubmitted && isSubmitSuccessful,
      })}
    >
      {t('feedback.text', undefined, { returnObjects: true }).map((text, i) => (
        <p className=" mb-5" key={`text-${i}`}>
          {text}
        </p>
      ))}

      <p className=" mb-5">
        {t('feedback.info1')}
        {/* <br />
        <b> */}
        {t('feedback.info2')}
        {/* </b> */}
      </p>
    </div>
  )
}

export default InfoBlock
