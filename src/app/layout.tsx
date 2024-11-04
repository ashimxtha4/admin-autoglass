import type { Metadata } from 'next'
import ReactQueryProvider from '@/services/provider/react-query-provider'
import Notification from '@/utils/notification'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin Panel | Auto Glass Shop',
  description: 'An online store for selling different parts of cars.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-[#d3f2d0]'>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
        <Notification />
      </body>
    </html>
  )
}
