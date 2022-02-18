import cls from 'classnames'

export const DotsLoader = ({ color = 'blue' }) => (
  <div className={cls('ifu-loader__feedback--ellipsis m-auto block', color)}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export const RingsLoader = ({ color = '' }) => (
  <div className="flex absolute justify-items-center items-center w-full h-full">
    <div
      className={cls('scale-75 lg:scale-100 ifu-loader__image--ripple', color)}
    >
      <div></div>
      <div></div>
    </div>
  </div>
)
