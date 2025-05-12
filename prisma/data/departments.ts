import { Prisma } from '@/prisma/generated/client'

const data: Prisma.DepartmentUncheckedCreateInput[] = [
  {
    name: 'US department',
    companyId: 1,
    countryCode: 'US'
  },
  {
    name: 'BG department',
    companyId: 1,
    countryCode: 'BG'
  }
]

export default data
