'use server'
import { Button } from '@headlessui/react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOutAction } from '@/actions/userActions'

const SignOut = () => {
  return <main className="flex items-center justify-center h-screen">
    <form action={signOutAction} className="flex flex-col items-center p-4 space-y-8 rounded-md bg-gray-600">     
      <h2 className="text-2xl text-gray-100">Are you sure you want to sign out?</h2>
      <Button
        type="submit"
        className={`flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white
          cursor-pointer`}
      >
        <ArrowRightStartOnRectangleIcon className='h-6' />
        <p className='ml-2'>Sign out</p>
      </Button>
    </form>
  </main>
}

export default SignOut
