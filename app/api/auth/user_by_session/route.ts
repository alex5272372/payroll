import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

export const GET = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('authjs.session-token')?.value

  if (!sessionToken) {
    return new Response('Unauthorized', { status: 401 })
  }

  const session = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
    include: {
      user: { include: { userRoles: true }},
    },
  })

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  return new Response(JSON.stringify(session.user), { status: 200 })
}
