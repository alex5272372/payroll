import CountriesCatalog from '@/components/catalog/CountriesCatalog'
import { getAllCountries } from '@/actions/countryActions'

const CountriesPage = async () => {
  const result = await getAllCountries()
  return <CountriesCatalog countries={result.value ?? []} />
}

export default CountriesPage
