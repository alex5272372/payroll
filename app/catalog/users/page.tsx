import UsersCatalog from '@/components/catalog/UsersCatalog'
import { getCachedAllUsers } from '@/app/catalog/users/data'

const UsersPage = async () => {
  const users = await getCachedAllUsers()
  return <UsersCatalog users={users} />
}

export default UsersPage
