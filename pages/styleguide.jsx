import Head from 'next/head'
import cls from 'classnames'
import _ from 'lodash'

import Layout from '../src/components/layout/Layout'
import MessageCard from '../src/components/messages/MessageCard'
import CategoryCard from '../src/components/home/ThemeCard'
import Button from '../src/components/Button'
import cat1 from '../public/images/category1.png'
import cat2 from '../public/images/category2.png'
import cat3 from '../public/images/category3.png'
import { H1, H2, H3, H4, H5, H6, HR } from '../src/components/Typo'
import TWConfig from '../tailwind.config'
import Icon from '../src/components/Icons.jsx'

export const CATEGORY_IMAGES = [cat1, cat2, cat3]

const ColorCircle = ({ colorClass, name, main }) => (
  <div>
    <span
      className={cls('inline-block rounded-full', colorClass, {
        'h-16 w-16 md:h-20 md:w-20': !main,
        'h-20 w-20 md:h-28 md:w-28': main,
      })}
    ></span>
    <div
      className={cls({
        'md:text-3xl text-lg text-center': main,
        'text-small': !main,
      })}
    >
      {name}
    </div>
  </div>
)

const ColorVariants = ({ colorName, variants }) => {
  const _variants = _.without(variants, 'DEFAULT')
  return (
    <div className="px-4 text-center">
      <ColorCircle colorClass={`bg-${colorName}`} name={colorName} main />
      {_variants.map((variant) => (
        <ColorCircle
          colorClass={`bg-${colorName}-${variant}`}
          name={`${colorName}-${variant}`}
          key={`key-${colorName}-${variant}`}
        />
      ))}
    </div>
  )
}

const Colors = () => {
  const colors = []
  _(TWConfig.theme.colors).forEach((variants, colorName) => {
    if (colorName !== 'white') {
      colors.push({ colorName, variants: _.keys(variants) })
    }
  })
  return (
    <div className=" grid grid-cols-3 lg:grid-cols-7 gap-8">
      {colors.map(({ colorName, variants }) => (
        <ColorVariants
          colorName={colorName}
          variants={variants}
          key={`key-${colorName}`}
        />
      ))}
    </div>
  )
}

export default function Components() {
  return (
    <Layout>
      <Head>
        <title>InfoFinland UI-komponentit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="block mx-3">
        <H1 className="pb-8 mb-6 border-b-2 border-black">
          InfoFinland UI-komponentit
        </H1>

        <H2 className="pb-8 mb-6 border-b-2 border-black">Typografia</H2>
        <H1>Otsikko 1</H1>
        <HR light />
        <H2>Otsikko 2</H2>
        <HR light />
        <H3>Otsikko 3</H3>
        <HR light />
        <H4>Otsikko 4</H4>
        <H4 bold>Otsikko 4</H4>
        <HR light />
        <H5>Otsikko 5</H5>
        <HR />
        <H6>Otsikko 6</H6>
        <HR />
        <p className="mb-8 sm:mb-16 text-body-small">
          Helsingin tavoitteena on olla kaupunki, joka tarjoaa työtä ja
          toimeentuloa sekä parhaat mahdolliset olosuhteet urbaanille, hyvälle
          elämälle. Tämän strategian visio on, että Helsingistä rakennetaan
          maailman toimivin kaupunki.
        </p>

        <p className="mb-8 sm:mb-16 text-body">
          Helsingin tavoitteena on olla kaupunki, joka tarjoaa työtä ja
          toimeentuloa sekä parhaat mahdolliset olosuhteet urbaanille, hyvälle
          elämälle. Tämän strategian visio on, että Helsingistä rakennetaan
          maailman toimivin kaupunki.
        </p>

        <p className="mb-8 sm:mb-16 text-body-large">
          Helsingin tavoitteena on olla kaupunki, joka tarjoaa työtä ja
          toimeentuloa sekä parhaat mahdolliset olosuhteet urbaanille, hyvälle
          elämälle. Tämän strategian visio on, että Helsingistä rakennetaan
          maailman toimivin kaupunki.
        </p>

        <Button>Go to cities</Button>
        <HR />
        <H2>Värit</H2>
        <Colors />
        <HR className="mb-8" />
        <H2 className="mb-8">Viestilaatikot</H2>

        <div className="py-8 px-2 mb-8 bg-gray-lighter">
          <MessageCard
            type="alert"
            title="COVID-19 alert"
            confirm={() => alert('OK')}
          >
            <p className="text-tiny">
              Covid-19 alert message Covid-19 situation affects some the of the
              processes described in InfoFinland. These effects are collected to
              a specific <a href="/covid">Covid-19 alert page</a> - would you
              like to view it now?{' '}
            </p>
          </MessageCard>
          <MessageCard
            type="warning"
            confirm={() => alert('KYLLÄ')}
            cancel={() => alert('EI')}
          >
            {' '}
            <p className="text-tiny">
              Covid-19 alert message Covid-19 situation affects some the of the
              processes described in InfoFinland. These effects are collected to
              a specific <a href="/covid">Covid-19 alert page</a> - would you
              like to view it now?{' '}
            </p>
          </MessageCard>
          <MessageCard
            type="message"
            confirm={() => alert('KYLLÄ')}
            cancel={() => alert('EI')}
          >
            {' '}
            <p className="text-tiny">
              Covid-19 alert message Covid-19 situation affects some the of the
              processes described in InfoFinland. These effects are collected to
              a specific <a href="/covid">Covid-19 alert page</a> - would you
              like to view it now?{' '}
            </p>
          </MessageCard>
        </div>
        <HR />
        <H2 className="mb-8">Kategoriakortti</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-28">
          <CategoryCard
            url="/"
            blue
            title="Otsikko"
            image={CATEGORY_IMAGES[0]}
          />
          <CategoryCard
            url="/"
            green
            title="Otsikko"
            image={CATEGORY_IMAGES[1]}
          />
          <CategoryCard
            url="/"
            blue
            title="Otsikko"
            image={CATEGORY_IMAGES[2]}
          />
          <CategoryCard
            url="/"
            green
            title="Otsikko"
            image={CATEGORY_IMAGES[1]}
          />
          <CategoryCard
            url="/"
            blue
            title="Otsikko"
            image={CATEGORY_IMAGES[0]}
          />
          <CategoryCard
            url="/"
            green
            title="Otsikko"
            image={CATEGORY_IMAGES[1]}
          />
          <CategoryCard
            url="/"
            blue
            title="Otsikko"
            image={CATEGORY_IMAGES[2]}
          />
          <CategoryCard
            url="/"
            green
            title="Otsikko"
            image={CATEGORY_IMAGES[1]}
          />
        </div>
        <HR />
        <H2 className="mb-8 text-center">Ikonit</H2>
        <div>
          <div className="flex gap-4 justify-center items-center mb-8">
            <Icon icon="facebook" title="Facebook" />
            <Icon icon="twitter" title="twitter" />
            <Icon icon="instagram" title="instagram" />
            <Icon icon="youtube" title="youtube" />
          </div>

          <div className="flex gap-4 justify-center items-center mb-8 h-6 text-center">
            <Icon icon="menu" />
            <Icon icon="home" />
            <Icon icon="angledown" className="text-black fill-current" />
            <Icon icon="angleup" className="text-black fill-current" />
            <Icon icon="cross" />
            <Icon icon="check" />
            <Icon icon="external" />
            <Icon icon="search" />
            <Icon icon="pdf" />
            <Icon icon="calendar" />
          </div>
        </div>
      </article>
    </Layout>
  )
}
