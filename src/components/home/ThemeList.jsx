import CategoryCard from '@/components/home/ThemeCard'

const ThemeList = ({ showImages, themes }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-28">
    {themes.map(({ url, title, id, image }, i) => (
      <CategoryCard
        key={`theme-${id}`}
        url={url}
        //greens on left (odds), blues on right (evens)
        {...{
          green: i % 2 === 0,
          blue: i % 2 !== 0,
        }}
        title={title}
        image={showImages && image}
      />
    ))}
  </div>
)

export default ThemeList
