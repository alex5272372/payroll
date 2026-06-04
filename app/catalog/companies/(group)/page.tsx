import CompaniesList from '@/app/catalog/companies/(group)/list'
import { getAllCompanies } from '@/app/catalog/companies/manager'

const CompaniesPage = async () => {
  const companies = await getAllCompanies()
  return <CompaniesList companies={companies} />
}

export default CompaniesPage
