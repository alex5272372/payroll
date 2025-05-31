import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('authjs.session-token')
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const userResponse = await fetch(new URL('/api/auth/user_by_session', request.url), {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `authjs.session-token=${sessionToken.value}`,
    },
  })

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = await userResponse.json()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/catalog/:path*'],
}
