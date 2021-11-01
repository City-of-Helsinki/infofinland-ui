import Button from '../Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import image from '../../../public/images/suomi-kartta.png'
import { HR } from '../Typo'
import Block from '../article/Block'
const CitySelector = () => {
  const { push } = useRouter()
  const goToCities = () => push('/cities')
  return (
    <Block>
      <HR className="border-gray-darker" />
      <div className="grid grid-cols-2 pb-8">
        <div className="foo">
          <h2 className="mb-4 text-h2">Cities</h2>
          <p className="mb-8">
            Purus non blandit sem consectetur et dignissim arcu pellentesque
            morbi neque.
          </p>

          <Button onClick={goToCities}>Go to Cities</Button>
        </div>
        <div className="">
          <Image src={image} alt="" />
        </div>
      </div>
    </Block>
  )
}

export default CitySelector
