import { AboutLayout } from '@/components/layout/Layout'

export default function AboutPage({ aboutMenu, footerMenu, children }) {
  return (
    <AboutLayout menu={aboutMenu} footerMenu={footerMenu}>
      {children}
    </AboutLayout>
  )
}
