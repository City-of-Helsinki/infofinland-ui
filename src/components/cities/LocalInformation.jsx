import Button from '@/components/Button'
import { IconMapMarker } from '@/components/Icons'
import ParseHtml from '@/components/ParseHtml'
import { useAtom } from 'jotai'
import { selectedCity, cityMenuVisibility } from '@/components/app/atoms'
import Block from '@/components/article/Block'
import cls from 'classnames'
const DEMOHTML = `
<div>

<p>Vocational training is aimed at both young people and adults. You can apply for vocational training all year round. You can study for an upper secondary education or increase your skills in vocational training. Vocational training in Vaasa is organised by Vamia and YA – Vocational College of Ostrobothnia (Yrkesakademin i Österbotten (YA)).</p>
<p>YA and Vamia also organise preparatory training for basic vocational training, i.e. VALMA. The training lasts for a maximum of one academic year. YA’s VALMA training is in Swedish; Handledande utbildning för yrkesutbildning.</p>
</div>
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
