import { signOut } from '@/auth'

const SignOut = async () => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit" className='m-2 p-2 bg-gray-400'>Sign Out</button>
    </form>
  )
}

export default SignOut
