import { getCachedCountryByCode } from '@/app/catalog/countries/data'
import CountryForm from '@/app/catalog/countries/[code]/form'
import { notFound } from 'next/navigation'

const CountryUpdatePage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = await params

  const country = await getCachedCountryByCode(code)

  if (!country) {
    notFound()
  }

  return <CountryForm country={country} />
}

export default CountryUpdatePage
