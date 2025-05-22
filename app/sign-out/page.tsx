'use server'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOutAction } from '@/actions/userActions'
import MainDialog from '@/components/MainDialog'

const SignOut = () => {
  return <MainDialog
    action={signOutAction}
    ButtonIcon={ArrowRightStartOnRectangleIcon}
    buttonText="Sign Out"
  >
    <h2 className="text-2xl text-gray-100">Are you sure you want to sign out?</h2>
  </MainDialog>
}

export default SignOut
