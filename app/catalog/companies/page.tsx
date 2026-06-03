import CompaniesCatalog from '@/components/catalog/CompaniesCatalog'
import { getCachedAllCompanies } from '@/app/catalog/companies/data'

const CompaniesPage = async () => {
  const companies = await getCachedAllCompanies()
  return <CompaniesCatalog companies={companies} />
}

export default CompaniesPage
