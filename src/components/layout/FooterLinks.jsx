import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconYoutube,
} from '../Icons'
import Link from 'next/link'
import cls from 'classnames'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { i18nCustom } from '@/next-i18next.config'
/**
 * SoMe Urls are defined in next.config.js
 * */
const FooterLinks = ({ secondary, tree }) => {
  const { t, language } = useTranslation('common')
  const margin = secondary ? 'ifu-block--secondary' : 'ifu-block--article'
  const { FB_URL, LINKEDIN_URL, YOUTUBE_URL, INSTAGRAM_URL } =
    getConfig().publicRuntimeConfig

  const { locale } = useRouter()

  const direction = i18nCustom.rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  return (
    <div className={cls(margin, 'mt-16 mb-16')}>
      <div className="py-10 border-t border-b border-gray-light ifu-footer__brand">
        <div
          className="mx-auto sm:mx-0 mb-5 ifu-footer__hki-logo"
          lang={language}
        />
        <p
          className={`mx-8 md:mx-0 text-tiny text-center ${
            direction === 'rtl' ? 'sm:text-right' : 'sm:text-left'
          } text-gray`}
        >
          {t('footer.helsinkiDisclaimer')}
        </p>
      </div>
      <div className="flex justify-center sm:justify-start items-center py-11 sm:py-7 mb-5 space-s-4">
        <a href={FB_URL} rel="noreferrer" className="inline-block">
          <IconFacebook title="Facebook" />
        </a>

        <a href={INSTAGRAM_URL} rel="noreferrer" className="inline-block">
          <IconInstagram title="Instagram" />
        </a>

        <a href={YOUTUBE_URL} rel="noreferrer" className="inline-block">
          <IconYoutube title="Youtube" />
        </a>

        <a href={LINKEDIN_URL} rel="noreferrer" className="inline-block">
          <IconLinkedin title="LinkedIn" />
        </a>
      </div>
      <div
        className={`mb-4 text-center ${
          direction === 'rtl' ? 'sm:text-right' : 'sm:text-left'
        } divide-black divide-s`}
      >
        {tree.map(({ title, url }, i) => {
          return (
            <Link
              href={url}
              passHref
              key={`footer-link-${i}`}
              locale={locale}
              prefetch={false}
              className="ifu-footer__link">
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default FooterLinks
