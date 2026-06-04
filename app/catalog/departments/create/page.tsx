import DepartmentCreateForm from '@/app/catalog/departments/create/form'
import { getAllCompanies } from '@/app/catalog/companies/manager'
import { getAllCountries } from '@/app/catalog/countries/manager'

const DepartmentCreatePage = async () => {
  const [companies, countries] = await Promise.all([
    getAllCompanies(),
    getAllCountries(),
  ])
  return <DepartmentCreateForm companies={companies} countries={countries} />
}

export default DepartmentCreatePage
