
import useTranslation from 'next-translate/useTranslation'
import { IconLookingGlass } from '@/components/Icons'
import Drawer from '@/components/layout/Drawer'
import { useState } from 'react'
import Button from '@/components/Button'
 const Search = () => {
  const [isOpen, setVisibility] = useState(false)

  const { t } = useTranslation('common')
  return (
    <>
    <div className=" flex-none 2xl:flex-grow">
      <button
      onClick={()=>setVisibility(!isOpen)}
        className=" w-8 md:w-24 h-8 text-action"
        title={t('buttons.search')}
      >
        <span className="px-2 transform translate-y-0.5">

          <IconLookingGlass className="" />
        </span>

        <span className="hidden md:inline-block">{t('buttons.search')}</span>
      </button>
    </div>
    <Drawer close={()=>setVisibility(false)} isOpen={isOpen}>

          <form className="bg-white">
<div className="flex border-b-2 border-t-2 border-gray-lighter py-4 mx-4">
          <div className="flex-grow ms-4 overflow-hidden">
        <input type="text"  name="" placeholder="Hae hakusanalla..." id=""  className="text-h4 md:text-h3xl"/>
        </div>
        <div className="flex-none">
        <button type="submit" className="inline-block"><IconLookingGlass className="mx-4" /></button>
        </div>
        </div>


        </form>

      </Drawer>
    </>
  )
}

export const SearchBar = ()=> {
  return (

    <div className="h-24">Search</div>

    )
}


export default Search
