import { cacheLife } from 'next/cache'
import { UserCreateRequest, UserResponse, UserUpdateRequest } from '@/types/models/userModels'
import {
  createUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserByEmailDb,
  getUserByIdDb,
  updatePasswordDb,
  updateUserDb
} from '@/app/catalog/users/repository'
import { ActionResult } from '@/types'

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

const getUserByEmail = async (email: string): Promise<UserResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const user = await getUserByEmailDb(email)
  return user
}

const createUser = async (data: UserCreateRequest): Promise<ActionResult> => {
  const result = await createUserDb(data)
  return result
}

const updateUser = async (id: number, data: UserUpdateRequest): Promise<ActionResult> => {
  const result = await updateUserDb(id, data)
  return result
}

const updatePassword = async (email: string, password: string): Promise<ActionResult> => {
  const result = await updatePasswordDb(email, password)
  return result
}

const deleteUser = async (id: number): Promise<ActionResult> => {
  const result = await deleteUserDb(id)
  return result
}

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
}
