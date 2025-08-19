import { NextRequest, NextResponse } from 'next/server'
import { CRUD, roleMatrix, UserRole } from './lib/data/roleMatrix'
import { MenuItemPath } from './lib/data/navigation'

export const middleware = async (request: NextRequest) => {
  let sessionToken = request.cookies.get('__Secure-authjs.session-token')
  if (!sessionToken) {
    sessionToken = request.cookies.get('authjs.session-token')
  }
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/user/sign-in', request.url))
  }

  const userResponse = await fetch(new URL('/api/auth/user_by_session', request.url), {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `authjs.session-token=${sessionToken.value}`,
    },
  })

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL('/user/sign-in', request.url))
  }

  const user = await userResponse.json()
  if (!user) {
    return NextResponse.redirect(new URL('/user/sign-in', request.url))
  }

  if (!user.emailVerified) {
    return NextResponse.redirect(new URL('/user/verify-email', request.url))
  }

  const path = request.nextUrl.pathname as MenuItemPath
  const userRoles = user.userRoles.map((role: Record<string, unknown>) => UserRole[role.role as keyof typeof UserRole])
  if (path && !userRoles.some((role: UserRole) => roleMatrix[path][role][CRUD.READ])) {
    const errorUrl = new URL('/user/error', request.url)
    errorUrl.searchParams.set('error', 'AccessDenied')
    return NextResponse.redirect(errorUrl)
  }
}

export const config = {
  matcher: [
    '/calendar/company-calendar',
    '/calendar/department-calendar',
    '/calendar/employee-calendar',
    '/catalog/:path*',
    '/document/:path*',
    '/report/:path*',
    '/user/profile',
  ],
}
