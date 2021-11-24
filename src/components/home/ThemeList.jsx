import CategoryCard from '@/components/home/ThemeCard'

const ThemeList = ({ showImages, themes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
    {themes.map(({ url, title }, i) => (
      <CategoryCard
        key={`theme-${i}`}
        url={url}
        //greens on left (odds), blues on right (evens)
        {...{
          green: i % 2 === 0,
          blue: i % 2 !== 0,
        }}
        title={title}
        image={showImages && '/images/category3.png'}
      />
    ))}
  </div>
)

export default ThemeList
