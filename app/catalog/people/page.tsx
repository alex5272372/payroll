import { getAllPeople } from '@/actions/personActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult } from '@/types'
import { Person } from '@prisma/client'

const PeopleCatalog = async () => {
  const people: ActionResult<Person[]> = await getAllPeople()

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} />
      <DataTable
        data={{
          columns: [
            { header: 'ID', width: 80 },
            { header: 'First name', width: 200 },
            { header: 'Last name', width: 200 },
            { header: 'Middle name', width: 200 },
            { header: 'Gender', width: 100 },
            { header: 'Birthdate', width: 150 },
          ],
          rows: people.value?.map((person: Person) => [
            String(person.id),
            person.firstName,
            person.lastName,
            person.middleName || '',
            person.gender || '',
            person.birthdate?.toISOString().split('T')[0] || '',
          ]) || []
        }}
      />
    </main>
  </Layout>
}

export default PeopleCatalog
