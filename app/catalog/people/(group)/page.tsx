import { getAllPeople } from '@/app/catalog/people/manager'
import PeopleList from '@/app/catalog/people/(group)/list'

const PeoplePage = async () => {
  const people = await getAllPeople()
  return <PeopleList people={people} />
}

export default PeoplePage
