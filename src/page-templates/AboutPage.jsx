import { SecondaryLayout } from '@/components/layout/Layout'
import useHydratePage from '@/hooks/useHydratePage'

export default function AboutPage({ children, ...props }) {
  useHydratePage({ ...props })

  return <SecondaryLayout secondary>{children}</SecondaryLayout>
}
