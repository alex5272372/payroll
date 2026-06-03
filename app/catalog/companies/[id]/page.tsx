import { getCachedCompanyById } from '@/app/catalog/companies/data'
import { getCachedAllCountries } from '@/app/catalog/countries/data'
import CompanyForm from '@/app/catalog/companies/[id]/form'
import { notFound } from 'next/navigation'

const CompanyUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const companyId = Number(id)

  if (isNaN(companyId)) {
    notFound()
  }

  const [company, countries] = await Promise.all([
    getCachedCompanyById(companyId),
    getCachedAllCountries(),
  ])

  if (!company) {
    notFound()
  }

  return <CompanyForm company={company} countries={countries} />
}

export default CompanyUpdatePage
