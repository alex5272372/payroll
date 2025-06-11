import { getAllCountries } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult } from '@/types'
import { Country } from '@prisma/client'

const CountriesCatalog = async () => {
  const countries: ActionResult<Country[]> = await getAllCountries()

  return <Layout>
    <main>
      <DataTable
        data={{
          columns: [{ header: 'Code', width: 80 }, { header: 'Name', width: 400 }],
          rows: countries.value?.map((country: Country) => [country.code, country.name]) || []
        }}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
