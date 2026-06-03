import { getCachedAllCompanies, getCachedAllCountries } from '@/app/catalog/departments/data'
import DepartmentCreateForm from '@/app/catalog/departments/create/form'

const DepartmentCreatePage = async () => {
  const [companies, countries] = await Promise.all([
    getCachedAllCompanies(),
    getCachedAllCountries(),
  ])
  return <DepartmentCreateForm companies={companies} countries={countries} />
}

export default DepartmentCreatePage
