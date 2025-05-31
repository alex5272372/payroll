import { Prisma } from '@prisma/client'

const data: Prisma.CompanyUncheckedCreateInput[] = [
  {
    name: 'My company',
    countryCode: 'US'
  }
]

export default data
