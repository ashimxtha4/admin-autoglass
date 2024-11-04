import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  if (!token) {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/:path*'],
}