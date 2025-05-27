'use client'
import { CheckIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import { useRouter } from 'next/navigation'

const VerifyRequest = () => {
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
    <div className='flex flex-col items-center'>
      <h2 className="text-2xl text-gray-100">Check your email</h2>
      <p className="text-gray-100">A sign in link has been sent to your email address.</p>
    </div>
  </MainDialog>
}

export default VerifyRequest
