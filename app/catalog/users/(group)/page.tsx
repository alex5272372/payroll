import { getAllUsers } from '@/app/catalog/users/manager'
import UsersList from '@/app/catalog/users/(group)/list'

const UsersPage = async () => {
  const users = await getAllUsers()
  return <UsersList users={users} />
}

export default UsersPage
