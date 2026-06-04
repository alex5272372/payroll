import DepartmentForm from '@/app/catalog/departments/[id]/form'
import { notFound } from 'next/navigation'
import { getDepartmentById } from '@/app/catalog/departments/manager'
import { getAllCompanies } from '@/app/catalog/companies/manager'
import { getAllCountries } from '@/app/catalog/countries/manager'

const DepartmentUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const departmentId = Number(id)

  if (isNaN(departmentId)) {
    notFound()
  }

  const [department, companies, countries] = await Promise.all([
    getDepartmentById(departmentId),
    getAllCompanies(),
    getAllCountries(),
  ])

  if (department) {
    return <DepartmentForm
      department={department}
      companies={companies}
      countries={countries}
    />

  } else {
    notFound()
  }
}

export default DepartmentUpdatePage
