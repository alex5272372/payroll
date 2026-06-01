import PeopleCatalog from '@/components/catalog/PeopleCatalog'
import { getAllPeople } from '@/actions/personActions'

const PeoplePage = async () => {
  const result = await getAllPeople()
  return <PeopleCatalog people={result.value ?? []} />
}

export default PeoplePage
