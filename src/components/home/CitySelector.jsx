import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import image from '@/public/images/suomi-kartta.png'
import Block from '@/components/layout/Block'
const CitySelector = () => {
  const { push } = useRouter()
  const goToCities = () => push('/cities')
  return (
    <Block className="pt-8 border-t border-gray-darker">
      <div className="grid grid-cols-2 pb-8">
        <div className="foo">
          <h2 className="mb-4 text-h2">Cities</h2>
          <p className="mb-8">
            Purus non blandit sem consectetur et dignissim arcu pellentesque
            morbi neque.
          </p>

          <Button onClick={goToCities}>Go to Cities</Button>
        </div>
        <div className="flex justify-center">
          <div className="">
            <Image
              src="/images/suomi-kartta.png"
              alt=""
              height="381"
              width="219"
              layout="intrinsic"
            />
          </div>
        </div>
      </div>
    </Block>
  )
}

export default CitySelector
