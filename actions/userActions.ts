'use server'
import prisma from '@/lib/prisma'
import { signIn } from "@/lib/auth"
import bcrypt from 'bcryptjs'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const signUpAction = async (formData: FormData): Promise<void> => {
  await prisma.user.create({
    data: {
      email: formData.get('email') as string,
      password: crypt(formData.get('password') as string),
      person: { create: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
      }},
      userRoles: { create: [
        { role: 'USER' }
      ]}
    }
  })
  
  await signIn('sendgrid-signup', {
    email: formData.get('email'),
    redirectTo: '/email-verified',
  })
}

const resetPasswordAction = async (email: string, password: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('User not found')
  }

  await prisma.user.update({
    where: { email },
    data: {
      password: crypt(password)
    }
  })
}

export {
  signUpAction,
  resetPasswordAction
}
