import { getCachedDepartmentById, getCachedAllCompanies, getCachedAllCountries } from '@/app/catalog/departments/data'
import DepartmentForm from '@/app/catalog/departments/[id]/form'
import { notFound } from 'next/navigation'

const DepartmentUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const departmentId = Number(id)

  if (isNaN(departmentId)) {
    notFound()
  }

  const [department, companies, countries] = await Promise.all([
    getCachedDepartmentById(departmentId),
    getCachedAllCompanies(),
    getCachedAllCountries(),
  ])

  if (!department) {
    notFound()
  }

  return <DepartmentForm department={department} companies={companies} countries={countries} />
}

export default DepartmentUpdatePage
