import Link from 'next/link'
import Image from 'next/image'
// import image from '@/public/logo/logo-vertical.png'
import Block from '@/components/layout/Block'
const HomeAbout = () => (
  <Block className="pt-8 border-t border-gray-darker">
    <div className="grid grid-cols-1 md:grid-cols-2 pb-8">
      <div className="hidden md:block float-left px-8 mt-14 text-center transform md:-translate-x-6 md:-translate-y-0.5">
        <Image
          src="/images/logo-vertical.png"
          height="190"
          width="237"
          alt=""
          layout="fixed"
        />
      </div>
      <div className="">
        <h2 className="mb-4 text-h2">About us</h2>
        <p className="mb-8">
          Commodo sed vel convallis scelerisque mauris, facilisi augue. Diam ut
          amet arcu velit egestas. Mauris nulla sed pharetra duis. Odio praesent
          euismod quis a at arcu ut suspendisse vestibulum. Arcu augue lorem vel
          eget viverra. Pellentesque orci mauris maecenas sit. Pretium proin
          purus vitae nisi. Velit, in sit enim ornare enim tincidunt risus
          blandit. Faucibus nunc rhoncus nec imperdiet commodo ac in.
        </p>
        <Link href="/cities" passHref prefetch={false}>
          <a className="text-body-small font-bold ifu-text-link">
            Learn more about us
          </a>
        </Link>
      </div>
    </div>
  </Block>
)

export default HomeAbout
