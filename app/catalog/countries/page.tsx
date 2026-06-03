import CountriesCatalog from '@/components/catalog/CountriesCatalog'
import { getCachedAllCountries } from '@/app/catalog/countries/data'

const CountriesPage = async () => {
  const countries = await getCachedAllCountries()
  return <CountriesCatalog countries={countries} />
}

export default CountriesPage
