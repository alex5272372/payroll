import CountryForm from '@/app/catalog/countries/[code]/form'
import { notFound } from 'next/navigation'
import { getCountryByCode } from '@/app/catalog/countries/manager'

const CountryUpdatePage = async ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = await params

  const country = await getCountryByCode(code)

  if (country) {
    return <CountryForm country={country} />
  } else {
    notFound()
  }
}

export default CountryUpdatePage
