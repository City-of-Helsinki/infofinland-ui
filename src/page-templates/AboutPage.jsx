import { SecondaryLayout } from '@/components/layout/Layout'

export default function AboutPage({ children, ...layout }) {
  return (
    <SecondaryLayout {...layout} secondary>
      {children}
    </SecondaryLayout>
  )
}
