import { signIn } from '@/auth'

const SignIn = async () => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <button type="submit" className='m-2 p-2 bg-gray-400'>Sign in</button>
    </form>
  )
}

export default SignIn
