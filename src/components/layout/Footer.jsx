import { IconFacebook, IconInstagram, IconTwitter, IconYoutube } from '../Icons'
import { HERO_MARGIN } from '@/components/article/Article'
import Link from 'next/link'
import cls from 'classnames'
import useTranslation from 'next-translate/useTranslation'

/**
 * SOME Urls are defined in next.config.js
 * */
const FooterLinks = () => {
  const { t } = useTranslation('common')

  return (
    <div className={cls(HERO_MARGIN, 'mt-16 mb-16')}>
      <section className="py-10 border-t border-b border-gray ifu-footer__brand">
        <div className="mx-auto sm:mx-0 mb-5 ifu-footer__hki-logo" />

        <p className=" mx-8 md:mx-0 text-tiny text-center sm:text-left text-gray">
          {t('footer.helsinkiDisclaimer')}
        </p>
      </section>
      <section className="flex justify-center sm:justify-start items-center py-11 sm:py-7 mb-5 space-s-4">
        <a
          href={process.env.FB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          <IconFacebook title="Facebook" />
        </a>

        <a
          href={process.env.TWITTER_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          <IconTwitter title="Twitter" />
        </a>

        <a
          href={process.env.INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          <IconInstagram title="Instagram" />
        </a>

        <a
          href={process.env.YOUTUBE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          <IconYoutube title="Youtube" />
        </a>
      </section>

      <section className="mb-4 text-center sm:text-left divide-black divide-s">
        <Link href="#about" passHref>
          <a className="ifu-footer__link">Sivukartta</a>
        </Link>
        <Link href="#privacy" passHref>
          <a className="ifu-footer__link">Tietoa palvelusta</a>
        </Link>
        <Link href="#terms" passHref>
          <a className="ifu-footer__link">Avoin data</a>
        </Link>
        <Link href="#cookies" passHref>
          <a className="ifu-footer__link">Saatavuus</a>
        </Link>
      </section>
    </div>
  )
}
export default FooterLinks
