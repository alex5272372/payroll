'use server'
import { signIn, signOut } from '@/lib/auth'

const userNavigationAction = async (actionId: string): Promise<void> => {
  if (actionId === 'signOut') {
    await signOut()

  } else if (actionId === 'signIn') {
    await signIn()
  }
}

export {
  userNavigationAction,
}
