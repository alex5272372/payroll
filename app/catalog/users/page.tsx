import UsersCatalog from '@/components/catalog/UsersCatalog'
import { getAllUsers } from '@/actions/userActions'

const UsersPage = async () => {
  const result = await getAllUsers()
  return <UsersCatalog users={result.value ?? []} />
}

export default UsersPage
