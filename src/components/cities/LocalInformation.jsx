import Button from '../Button'
import { IconMapMarker } from '../Icons'
import ParseHtml from '../ParseHtml'
import { useAtom } from 'jotai'
import { selectedCity, cityMenuVisibility } from '../app/atoms'
import Block from '../article/Block'
import cls from 'classnames'
const DEMOHTML = `
<div>
<p>The education system includes early childhood education, preschool
education, comprehensive education, upper secondary education and higher
education. Adult education is intended for adults and <a href="/" class="class-from-content"title="some title" id="doodaa"><span>it</span> <span>includes</span></a> a
multitude of alternatives from comprehensive to higher education</p>
<ul>
<li>Adult education is intended</li>
<li>early childhood education</li>
<li>comprehensive education</li>
<li>upper secondary education </li>
</ul>
<p>The education system includes early childhood education, preschool
education, comprehensive education, upper secondary education and higher
education. Adult education is intended for adults and <a href="/" class="class-from-content"title="some title" id="doodaa"><span>it</span> <span>includes</span></a> a
multitude of alternatives from comprehensive to higher education</p></div>
`
const LocalInformation = () => {
  const [city] = useAtom(selectedCity)
  // eslint-disable-next-line no-unused-vars
  const [, setOpen] = useAtom(cityMenuVisibility)
  const openMenu = () => setOpen(true)

  return (
    <div className="mb-8">
      <Block className="bg-green-lighter md:rounded">
        <div className=" md:flex md:justify-around items-center py-6">
          {!city && (
            <h3 className="md:flex-grow text-h3 font-bold">
              <IconMapMarker className="h-9 me-2 md:me-4" />
              Local information
            </h3>
          )}
          {city && (
            <IconMapMarker
              className={cls('me-2 md:me-4 h-9 inline-block', {
                'mt-2': city,
              })}
            />
          )}
          {city && (
            <h3 className="flex-grow text-h3 font-bold">
              <span className="block text-action font-normal text-dark">
                Local information
              </span>
              {city}
            </h3>
          )}
          <div className="md:flex-none mt-6 md:mt-0 mb-2 md:mb-0">
            <Button onClick={openMenu}>
              {!city && 'Choose City'}
              {city && 'Change City'}
            </Button>
          </div>
        </div>
      </Block>
      {city && (
        <Block className="py-8 mb-4 bg-green-white">
          <ParseHtml html={DEMOHTML} />
        </Block>
      )}
    </div>
  )
}
export default LocalInformation
