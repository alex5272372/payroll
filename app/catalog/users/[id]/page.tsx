import UserForm from '@/app/catalog/users/[id]/form'
import { notFound } from 'next/navigation'
import { getUserById } from '@/app/catalog/users/manager'
import { getAllPeople } from '@/app/catalog/people/manager'

const UserUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const userId = Number(id)

  if (isNaN(userId)) {
    notFound()
  }

  const [user, people] = await Promise.all([
    getUserById(userId),
    getAllPeople(),
  ])

  if (!user) {
    notFound()
  }

  return <UserForm user={user} people={people} />
}

export default UserUpdatePage
