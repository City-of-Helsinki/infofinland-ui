import parse, { domToReact, attributesToProps } from 'html-react-parser'
import cls from 'classnames'
import TextLink from '@/components/TextLink'
import { H1, H2, H3, H4, H5, HR } from './Typo'
const MISSING_TOKEN = '#missing'
const options = {
  replace: ({ name, attribs, children }) => {
    const { href, class: className, ...rest } = attribs || {}

    switch (name) {
      case 'a':
        return (
          <TextLink
            href={href || MISSING_TOKEN}
            className={cls(
              'underline border-link text hover:no-underline font-bold',
              className
            )}
            {...attributesToProps(rest)}
          >
            {domToReact(children, options)}
          </TextLink>
        )

      case 'p':
        return <p className="mb-6">{domToReact(children, options)}</p>
      case 'h1':
        return <H1 className="mb-8">{domToReact(children, options)}</H1>
      case 'h2':
        return <H2 className="mb-8">{domToReact(children, options)}</H2>
      case 'h3':
        return <H3 className="mb-8">{domToReact(children, options)}</H3>
      case 'h4':
        return <H4 className="mb-8">{domToReact(children, options)}</H4>
      case 'h5':
        return <H5 className="mb-8">{domToReact(children, options)}</H5>
      case 'hr':
        return <HR className="mb-8" />
    }
  },
}

const ParseHtml = ({ html }) => parse(html, options)

export default ParseHtml
