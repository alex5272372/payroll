import UsersCatalog from '@/components/catalog/UsersCatalog'
import { getAllUsers } from '@/app/catalog/users/actions'

const UsersPage = async () => {
  const result = await getAllUsers()
  return <UsersCatalog users={result.value ?? []} />
}

export default UsersPage
