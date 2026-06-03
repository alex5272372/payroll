import PeopleCatalog from '@/components/catalog/PeopleCatalog'
import { getAllPeople } from '@/app/catalog/people/actions'

const PeoplePage = async () => {
  const result = await getAllPeople()
  return <PeopleCatalog people={result.value ?? []} />
}

export default PeoplePage
