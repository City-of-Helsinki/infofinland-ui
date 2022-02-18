import parse, { domToReact, attributesToProps } from 'html-react-parser'
import cls from 'classnames'
import TextLink from '@/components/TextLink'
import { H2, H3, H4, H5 } from './Typo'
const MISSING_TOKEN = '#missing'
const options = {
  replace: ({ name, attribs, children }) => {
    if (name === 'a') {
      const { href, class: className, ...rest } = attribs
      return (
        <TextLink
          href={href || MISSING_TOKEN}
          className={cls('font-bold', className)}
          {...attributesToProps(rest)}
        >
          {domToReact(children, options)}
        </TextLink>
      )
    } else if (name === 'p') {
      // const { href, class: className, ...rest } = attribs
      return <p className="mb-8">{domToReact(children, options)}</p>
    } else if (name === 'h2') {
      // const { href, class: className, ...rest } = attribs
      return <H2 className="mb-8">{domToReact(children, options)}</H2>
    } else if (name === 'h3') {
      // const { href, class: className, ...rest } = attribs
      return <H3 className="mb-8">{domToReact(children, options)}</H3>
    } else if (name === 'h4') {
      // const { href, class: className, ...rest } = attribs
      return <H4 className="mb-8">{domToReact(children, options)}</H4>
    } else if (name === 'h5') {
      // const { href, class: className, ...rest } = attribs
      return <H5 className="mb-8">{domToReact(children, options)}</H5>
    }
  },
}

const ParseHtml = ({ html }) => parse(html, options)

export default ParseHtml
