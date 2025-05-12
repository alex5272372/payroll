'use server'
import { MenuItemType } from '@/lib'
import { signIn, signOut } from '@/lib/auth'

const userNavigationAction = async (actionId: string): Promise<void> => {
  if (actionId === MenuItemType.SIGN_OUT) {
    await signOut()

  } else if (actionId === MenuItemType.SIGN_IN) {
    await signIn()
  }
}

export {
  userNavigationAction,
}
