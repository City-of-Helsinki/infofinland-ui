const HomeHero = ({ title, image }) => (
  <div
    className="relative mb-14 h-homehero md:h-homeheroxl"
    style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <h1 className="absolute bottom-0 mb-16 ml-6 md:max-w-lg text-h1 md:text-h1xl lg:text-h1xl text-white md:ms-12 ifu-hero-home__title text-shadow-home md:min-w-md">
      {title}
    </h1>
  </div>
)

export default HomeHero
