'use server'
import { MenuItemPath } from '@/lib'
import { signIn, signOut } from '@/lib/auth'

const userNavigationAction = async (actionId: string): Promise<void> => {
  if (actionId === MenuItemPath.SIGN_OUT) {
    await signOut()

  } else if (actionId === MenuItemPath.SIGN_IN) {
    await signIn()
  }
}

export {
  userNavigationAction,
}
