import { ReactNode } from "react"

type LayoutProps = {
  cName: string;
  children: ReactNode
}
const Layout = ({ cName, children }: LayoutProps) => {
  return (
    <main className={cName}>
      {children}
    </main>
  )
}

export default Layout
