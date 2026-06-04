import PersonForm from '@/app/catalog/people/[id]/form'
import { notFound } from 'next/navigation'
import { getPersonById } from '@/app/catalog/people/manager'

const PersonUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const personId = Number(id)

  if (isNaN(personId)) {
    notFound()
  }

  const person = await getPersonById(personId)

  if (!person) {
    notFound()
  }

  return <PersonForm person={person} />
}

export default PersonUpdatePage
