import { useRouter } from 'next/navigation'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import { DialogButtonState } from '@/types'

const ErrorDialog = ({ header, message }: { header: string; message?: string }) => {
  const router = useRouter()

  const handleOk = async () => {
    router.push('/')
  }

  const buttons: DialogButtonState[] = [
    {
      Icon: XMarkIcon,
      title: 'Close',
      onClick: handleOk,
    },
  ]

  return <MainDialog
    Icon={ExclamationTriangleIcon}
    title="Error"
    buttons={buttons}
  >
    <div className='flex flex-col items-center'>
      <h2 className="text-2xl text-gray-100">{header}</h2>
      {message && <p className="text-gray-100">{message}</p>}
    </div>
  </MainDialog>
}

export default ErrorDialog
