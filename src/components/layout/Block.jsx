import cls from 'classnames'

const Block = ({ children, className, hero, about }) => {

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
