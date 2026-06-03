import { getCachedAllCountries } from '@/app/catalog/countries/data'
import CompanyCreateForm from '@/app/catalog/companies/create/form'

const CompanyCreatePage = async () => {
  const countries = await getCachedAllCountries()
  return <CompanyCreateForm countries={countries} />
}

export default CompanyCreatePage
