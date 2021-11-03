// import { ARTICLE_MARGIN_CLASS } from './Article'
import cls from 'classnames'

import { BLOCK_MARGIN } from '@/components/article/Article'

const Block = ({ children, className }) => (
  <div className={cls(BLOCK_MARGIN, className)}>{children}</div>
)

export default Block
