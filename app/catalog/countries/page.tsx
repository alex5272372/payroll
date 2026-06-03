import CountriesCatalog from '@/components/catalog/CountriesCatalog'
import { getAllCountries } from '@/app/catalog/countries/actions'

const CountriesPage = async () => {
  const result = await getAllCountries()
  return <CountriesCatalog countries={result.value ?? []} />
}

export default CountriesPage
