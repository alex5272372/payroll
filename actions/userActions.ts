'use server'
import { signIn, signOut } from '@/lib/auth'

const signInAction = async (formData: FormData): Promise<void> => {
  await signIn('credentials', {
    email: formData.get('email'),
    password: formData.get('password'),
    redirectTo: '/',
  })
}

const signOutAction = async (): Promise<void> => {
  await signOut({ redirectTo: '/' })
}

export {
  signInAction,
  signOutAction
}
