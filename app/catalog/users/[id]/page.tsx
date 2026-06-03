import { getCachedUserById, getCachedAllPeople } from '@/app/catalog/users/data'
import UserForm from '@/app/catalog/users/[id]/form'
import { notFound } from 'next/navigation'

const UserUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const userId = Number(id)

  if (isNaN(userId)) {
    notFound()
  }

  const [user, people] = await Promise.all([
    getCachedUserById(userId),
    getCachedAllPeople(),
  ])

  if (!user) {
    notFound()
  }

  return <UserForm user={user} people={people} />
}

export default UserUpdatePage
