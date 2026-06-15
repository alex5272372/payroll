import { cacheLife } from 'next/cache'
import { UserResponse } from '@/types/models/userModels'
import { getAllUsersDb, getUserByIdDb } from '@/app/catalog/users/repository'

const getAllUsers = async (): Promise<UserResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const users = await getAllUsersDb()
  return users
}

const getUserById = async (id: number): Promise<UserResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const user = await getUserByIdDb(id)
  return user
}

export {
  getAllUsers,
  getUserById,
}
