import cls from 'classnames'

export const BLOCK_MARGIN = `px-6 lg:mx-12 xl:mx-28 2xl:mx-48 3xl:ms-64 3xl:max-w-4xl`
export const HERO_MARGIN =
  'mx-6 lg:mx-12 xl:mx-28 2xl:mx-48 3xl:ms-64 3xl:max-w-4xl'
export const ABOUT_MARGIN = `px-6 md:max-w-screen-md lg:max-w-screen-lg`

const Block = ({ children, className, hero, about }) => {
  // const margin = about ? ABOUT_MARGIN : hero ? HERO_MARGIN : BLOCK_MARGIN
  return (
    <div
      className={cls(className, {
        'ifu-block--article': !hero && !about,
        'ifu-block--hero': hero,
        'ifu-block--secondary': about,
      })}
    >
      {children}
    </div>
  )
}

export default Block
