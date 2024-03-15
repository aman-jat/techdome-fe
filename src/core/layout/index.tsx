import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

import { Stack } from '@mui/material'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Stack p={2} minHeight="40vh">
        {children}
      </Stack>
      <Footer />
    </div>
  )
}

export default Layout
