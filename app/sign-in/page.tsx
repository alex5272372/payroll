'use server'
import { Button, Field, Input, Label } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { signInAction } from '@/actions/userActions'

const SignIn = () => {
  return <main className="flex items-center justify-center h-screen">
    <form action={signInAction} className="flex flex-col items-end p-4 space-y-4 rounded-md bg-gray-600">
      <Field>
        <Label className="text-gray-100">Email:</Label>
        <Input name="email" type="email" className="ml-2 py-1 px-2 rounded-md bg-gray-100" />
      </Field>

      <Field>
        <Label className="text-gray-100">Password:</Label>
        <Input name="password" type="password" className="ml-2 py-1 px-2 rounded-md bg-gray-100" />
      </Field>

      <Button
        type="submit"
        className={`flex self-center py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 
          hover:text-white cursor-pointer`}
      >
        <ArrowRightEndOnRectangleIcon className="h-6" />
        <p className="ml-2">Sign In</p>
      </Button>
    </form>
  </main>
}

export default SignIn
