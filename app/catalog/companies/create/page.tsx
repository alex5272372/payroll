import CompanyCreateForm from '@/app/catalog/companies/create/form'
import { getAllCountries } from '@/app/catalog/countries/manager'

const CompanyCreatePage = async () => {
  const countries = await getAllCountries()
  return <CompanyCreateForm countries={countries} />
}

export default CompanyCreatePage
