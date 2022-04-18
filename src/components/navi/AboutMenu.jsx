import Menu from '@/components/navi/Menu'
import { aboutMenuAtom } from '@/src/store'
import { useAtomValue } from 'jotai/utils'

const AboutMenu = () => {
  const menu = useAtomValue(aboutMenuAtom)
  return <Menu menu={menu} />
}

export default AboutMenu
