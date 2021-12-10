import { SecondaryLayout } from '@/components/layout/Layout'

export default function AboutPage({ menu, footerMenu, children }) {
  return (
    <SecondaryLayout menu={menu} footerMenu={footerMenu} secondary>
      {children}
    </SecondaryLayout>
  )
}
