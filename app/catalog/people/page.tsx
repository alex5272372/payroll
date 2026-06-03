import PeopleCatalog from '@/components/catalog/PeopleCatalog'
import { getCachedAllPeople } from '@/app/catalog/people/data'

const PeoplePage = async () => {
  const people = await getCachedAllPeople()
  return <PeopleCatalog people={people} />
}

export default PeoplePage
