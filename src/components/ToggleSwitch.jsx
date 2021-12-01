import cls from 'classnames'

export default function ToggleSwitch({ text, id, className, ...inputProps }) {
  return (
    <label htmlFor={id} className={cls('ifu-toggleswitch__label', className)}>
      {text}

      <input
        type="checkbox"
        {...inputProps}
        id={id}
        className="ifu-toggleswitch__input"
      />
      <span className="ifu-toggleswitch__switch" />
    </label>
  )
}
