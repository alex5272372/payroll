import { useRouter } from 'next/navigation'
import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import { DialogButtonState } from '@/types'

const OkDialog = ({ header, message }: { header: string; message?: string }) => {
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
    Icon={InformationCircleIcon}
    title="Information"
    buttons={buttons}
  >
    <div className='flex flex-col items-center'>
      <h2 className="text-2xl text-gray-100">{header}</h2>
      {message && <p className="text-gray-100">{message}</p>}
    </div>
  </MainDialog>
}

export default OkDialog
