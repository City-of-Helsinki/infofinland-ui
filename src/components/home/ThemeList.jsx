import CategoryCard from './ThemeCard'
import { CATEGORY_IMAGES } from '../../../pages/styleguide'
import Block from '../article/Block'

const ThemeList = ({ showImages }) => (
  // { themes }
  <Block>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
      <CategoryCard
        url="/theme/page/"
        blue
        title="Работа и предпринимательство ринимательство"
        image={showImages && CATEGORY_IMAGES[0]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Otsikko Otsikko Otsikko Otsikko"
        image={showImages && CATEGORY_IMAGES[1]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[2]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        blue
        title="健康"
        image={showImages && CATEGORY_IMAGES[1]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        blue
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[0]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[1]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="اتباع کشورهای خارج از اتحادیه اروپا"
        image={showImages && CATEGORY_IMAGES[2]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        blue
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[1]}
      />
    </div>
  </Block>
)

export default ThemeList
