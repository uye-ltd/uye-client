import { Sidebar } from '@/widgets/sidebar'
import { Footer } from '@/widgets/footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Sidebar />
      {children}
      <Footer />
    </>
  )
}
