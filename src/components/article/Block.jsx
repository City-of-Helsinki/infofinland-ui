// import { ARTICLE_MARGIN_CLASS } from './Article'
import cls from 'classnames'

import { BLOCK_MARGIN, HERO_MARGIN } from '@/components/article/Article'

const Block = ({ children, className, hero }) => {
  const margin = hero ? HERO_MARGIN : BLOCK_MARGIN
  return <div className={cls(margin, className)}>{children}</div>
}

export default Block
