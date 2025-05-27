'use client'
import { CheckIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import { useRouter } from 'next/navigation'

const SignOut = () => {
  const router = useRouter()

  const handleOk = async () => {
    router.push('/')
  }

  const buttons: DialogButtonState[] = [
    {
      Icon: CheckIcon,
      title: 'OK',
      onClick: handleOk,
    },
  ]

  return <MainDialog
    Icon={IdentificationIcon}
    title="User"
    buttons={buttons}
  >
    <h2 className="text-2xl text-gray-100">Email verified</h2>
  </MainDialog>
}

export default SignOut
