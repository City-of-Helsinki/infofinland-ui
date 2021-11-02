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
        title="Moving to Finland"
        image={showImages && CATEGORY_IMAGES[0]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Settling in Finland"
        image={showImages && CATEGORY_IMAGES[1]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        blue
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[2]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Otsikko"
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
        blue
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[2]}
      />
      <CategoryCard
        url="/theme/page/subpage"
        green
        title="Otsikko"
        image={showImages && CATEGORY_IMAGES[1]}
      />
    </div>
  </Block>
)

export default ThemeList
