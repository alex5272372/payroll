'use server'
import prisma from '@/lib/prisma'
import { Person } from '@prisma/client'
import { ActionResult } from '@/types'

const getAllPeople = async (): Promise<ActionResult<Person[]>> => {
  const people: Person[] = await prisma.person.findMany()
  
  return {
    success: true,
    value: people,
  }
}

export {
  getAllPeople,
}
