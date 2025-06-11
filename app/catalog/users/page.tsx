import { UserWithPerson, getAllUsers } from '@/actions/userActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult } from '@/types'

const UsersCatalog = async () => {
  const users: ActionResult<UserWithPerson[]> = await getAllUsers()

  return <Layout>
    <main>
      <DataTable
        data={{
          columns: [
            { header: 'ID', width: 80 },
            { header: 'Email', width: 300 },
            { header: 'Person', width: 300 },
            { header: 'Email verified', width: 250 },
          ],
          rows: users.value?.map((user: UserWithPerson) => [
            String(user.id),
            user.email,
            `${user.person.firstName} ${user.person.lastName} (${user.personId})`,
            user.emailVerified?.toISOString() || '',
          ]) || []
        }}
      />
    </main>
  </Layout>
}

export default UsersCatalog
