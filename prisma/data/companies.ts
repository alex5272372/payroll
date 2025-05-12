import { Prisma } from '@/prisma/generated/client'

const data: Prisma.CompanyUncheckedCreateInput[] = [
  {
    name: 'My company',
    countryCode: 'US'
  }
]

export default data
