import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'

import { Providers } from './providers'
import Navbar from './components/Navbar'
import ClientRedirect from './components/ClientRedirect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Club Membership NFT Portal',
  description: 'A membership NFT portal for club members',
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <ClientRedirect />
          {props.children}
        </Providers>
      </body>
    </html>
  )
}
