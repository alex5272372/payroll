'use server'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { signInAction } from '@/actions/userActions'
import MainDialog from '@/components/MainDialog'

const SignIn = () => {
  return <MainDialog
    action={signInAction}
    ButtonIcon={ArrowRightEndOnRectangleIcon}
    buttonText="Sign In"
  >
    <Field>
      <Label className="text-gray-100">Email:</Label>
      <Input name="email" type="email" className="ml-2 py-1 px-2 rounded-md bg-gray-100" />
    </Field>

    <Field>
      <Label className="text-gray-100">Password:</Label>
      <Input name="password" type="password" className="ml-2 py-1 px-2 rounded-md bg-gray-100" />
    </Field>
  </MainDialog>
}

export default SignIn
