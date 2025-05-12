import { Prisma } from '@/prisma/generated/client'

const data: Prisma.EpmloyeeUncheckedCreateInput[] = [
  {
    departmentId: 1,
    personId: 1
  },
  {
    departmentId: 1,
    personId: 2
  },
  {
    departmentId: 2,
    personId: 3
  }
]

export default data
