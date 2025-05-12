import { Prisma } from '@/prisma/generated/client'
import bcrypt from 'bcryptjs'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const data: Prisma.UserUncheckedCreateInput[] = [
  {
    email: 'rauchg@vercel.com',
    password: crypt('rauchg'),
    image:
      'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/'
        + 'ucxb4lHy_400x400.jpg',
    personId: 1,
    userRoles: { create: [
      { role: 'ADMINISTRATOR' },
      { role: 'MODERATOR' },
      { role: 'USER' }
    ] }
  },
  {
    email: 'lee@vercel.com',
    password: crypt('lee'),
    image:
      'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/'
        + 'adWRdqQ6_400x400.jpg',
    personId: 2,
    userRoles: { create: [
      { role: 'MODERATOR' },
      { role: 'USER' }
    ] }
  },
  {
    email: 'stey@vercel.com',
    password: crypt('stey'),
    image:
      'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg',
    personId: 3,
    userRoles: { create: [
      { role: 'USER' }
    ] }
  }
]

export default data
