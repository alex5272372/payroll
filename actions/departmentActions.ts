'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize } from '@/lib'
import { DepartmentResponse } from '@/types/models/departmentModels'

const getAllDepartments = async (): Promise<ActionResult<DepartmentResponse[]>> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.READ)
  if (guard) return guard

  const departments = await prisma.department.findMany({
    include: { company: { select: { name: true }}}
  })

  return {
    success: true,
    value: departments.map(d => ({
      id: d.id,
      name: d.name,
      companyId: d.companyId,
      countryCode: d.countryCode,
      companyName: d.company.name,
    })),
  }
}

export {
  getAllDepartments,
}
