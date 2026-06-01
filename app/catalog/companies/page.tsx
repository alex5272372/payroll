import CompaniesCatalog from '@/components/catalog/CompaniesCatalog'
import { getAllCompanies } from '@/actions/companyActions'

const CompaniesPage = async () => {
  const result = await getAllCompanies()
  return <CompaniesCatalog companies={result.value ?? []} />
}

export default CompaniesPage
