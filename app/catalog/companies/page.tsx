import { Company } from '@prisma/client'
import { getAllCompanies } from '@/actions/companyActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ActionResult } from '@/types'
import { catalogToolbar } from '@/lib'

const CompaniesCatalog = async () => {
  const companies: ActionResult<Company[]> = await getAllCompanies()

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} />
      <DataTable
        data={{
          columns: [{ header: 'ID', width: 80 }, { header: 'Name', width: 400 }, { header: 'Country', width: 80 }],
          rows: companies.value?.map((company: Company) =>
            [String(company.id), company.name, company.countryCode]) || []
        }}
      />
    </main>
  </Layout>
}

export default CompaniesCatalog
