import CategoryCard from '@/components/home/ThemeCard'

const ThemeList = ({ showImages }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
    <CategoryCard
      url="/theme/page/"
      blue
      title="Moving to Finland"
      image={showImages && '/images/category1.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      green
      title="Settling in Finland"
      image={showImages && '/images/category2.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      blue
      title="Otsikko"
      image={showImages && '/images/category3.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      green
      title="Otsikko"
      image={showImages && '/images/category3.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      blue
      title="Otsikko"
      image={showImages && '/images/category2.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      green
      title="Otsikko"
      image={showImages && '/images/category3.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      blue
      title="Otsikko"
      image={showImages && '/images/category3.png'}
    />
    <CategoryCard
      url="/theme/page/subpage"
      green
      title="Otsikko"
      image={showImages && '/images/category3.png'}
    />
  </div>
)

export default ThemeList
