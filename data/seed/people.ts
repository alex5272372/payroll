import { Gender, Prisma } from '@prisma/client'

const data: Prisma.PersonUncheckedCreateInput[] = [
  {
    firstName: 'Guillermo',
    lastName: 'Rauch',
    gender: Gender.MALE,
    birthdate: new Date('2001-01-01')
  },
  {
    firstName: 'Lee',
    lastName: 'Robinson',
    gender: Gender.MALE,
    birthdate: new Date('2002-01-01')
  },
  {
    firstName: 'Steven',
    lastName: 'Tey',
    gender: Gender.MALE,
    birthdate: new Date('2003-01-01')
  }
]

export default data
