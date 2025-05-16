import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Image from "next/legacy/image"
// import image from '@/public/images/suomi-kartta.png'
import Block from '@/components/layout/Block'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { i18n } from '@/next-i18next.config'

const CitySelector = () => {
  const { CITIES_PAGE_PATH } = getConfig().publicRuntimeConfig
  const { t } = useTranslation('common')
  const router = useRouter()
  let locale = router.locale

  if (i18n.disabledLocales.includes(locale)) {
    return null
  }
  const goToCities = () => router.push(CITIES_PAGE_PATH)

  return (
    <Block className="pt-8 border-t border-gray-darker">
      <div className="lg:grid grid-cols-2 pb-8">
        <div className="foo">
          <h2 className="mb-4 text-h2">{t('frontpage.cities.title')}</h2>
          <p className="mb-8">{t('frontpage.cities.text')}</p>

          <Button onClick={goToCities} aria-haspopup="dialog">
            {t('frontpage.cities.button')}
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="hidden lg:block">
            <Image
              src="/images/suomi-kartta.png"
              alt=""
              height="381"
              width="219"
              layout="intrinsic"
            />
          </div>
        </div>
      </div>
    </Block>
  )
}

export default CitySelector
