import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Public paths
  const isPublicPath = [
    '/',
    '/login',
    '/signup',
    '/email-verification',
    '/forgot-password',
    '/reset-password'
  ].some(path => pathname.startsWith(path))

  // Get token from cookies (works in all browsers)
  const token = request.cookies.get('access_token')?.value

  console.log(token)
  // Redirect unauthenticated users from protected routes
  // if (!token && !isPublicPath) {
  //   return NextResponse.redirect(new URL('/login', origin))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}