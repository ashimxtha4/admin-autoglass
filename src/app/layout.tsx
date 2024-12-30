import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import ReactQueryProvider from '@/services/provider/react-query-provider'
import Notification from '@/utils/notification'
import './globals.css'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Admin Panel | Auto Glass Shop',
  description: 'An online store for selling different parts of cars.'
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn('bg-[#d3f2d0]', roboto.className)}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
        <Notification />
      </body>
    </html>
  )
}
