import parse, { domToReact, attributesToProps } from 'html-react-parser'
import cls from 'classnames'
import TextLink from '@/components/TextLink'

const options = {
  replace: ({ name, attribs, children }) => {
    if (name === 'a') {
      const { href, class: className, ...rest } = attribs
      return (
        <TextLink
          href={href}
          className={cls('font-bold', className)}
          {...attributesToProps(rest)}
        >
          {domToReact(children, options)}
        </TextLink>
      )
    } else if (name === 'p') {
      // const { href, class: className, ...rest } = attribs
      return <p className="mb-8">{domToReact(children, options)}</p>
    }
    //DEMO CODE
    else if (attribs?.class && /normal/.test(attribs.class)) {
      return <span />
    }
  },
}

const ParseHtml = ({ html }) => parse(html, options)

export default ParseHtml
