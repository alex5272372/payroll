import { getCompanyById } from '@/app/catalog/companies/manager'
import { getAllCountries } from '@/app/catalog/countries/manager'
import CompanyForm from '@/app/catalog/companies/[id]/form'
import { notFound } from 'next/navigation'

const CompanyUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const companyId = Number(id)

  if (isNaN(companyId)) {
    notFound()
  }

  const [company, countries] = await Promise.all([
    getCompanyById(companyId),
    getAllCountries(),
  ])

  if (company) {
    return <CompanyForm company={company} countries={countries} />
  } else {
    notFound()
  }
}

export default CompanyUpdatePage
