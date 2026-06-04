import { getAllCountries } from '@/app/catalog/countries/manager'
import CountriesList from '@/app/catalog/countries/(group)/list'

const CountriesPage = async () => {
  const countries = await getAllCountries()
  return <CountriesList countries={countries} />
}

export default CountriesPage
