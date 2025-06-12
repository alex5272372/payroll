'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActionResult } from '@/types'

export type DepartmentWithCompany = Prisma.DepartmentGetPayload<{
  include: { company: { select: { name: boolean } } }
}>

const getAllDepartments = async (): Promise<ActionResult<DepartmentWithCompany[]>> => {
  const departments: DepartmentWithCompany[] = await prisma.department.findMany({
    include: { company: { select: { name: true }}}
  })

  return {
    success: true,
    value: departments,
  }
}

export {
  getAllDepartments,
}
