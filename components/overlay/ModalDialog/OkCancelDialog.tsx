import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { ButtonGroupState } from '@/types'
import ModalDialogButtons from '@/components/overlay/ModalDialog/ModalDialogButtons'

const OkCancelDialog = ({
  header,
  message,
  onOk,
  onCancel,
}: {
  header?: string
  message?: string
  onOk?: () => void
  onCancel?: () => void
}) => {
  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: CheckIcon,
        title: 'OK',
        onClick: onOk,
      },
      {
        Icon: XMarkIcon,
        title: 'Cancel',
        onClick: onCancel,
      },
    ],
  }

  return <div className='flex flex-col items-center p-4 rounded-b-md bg-gray-600'>
    {header && <h2 className="text-2xl text-gray-100">{header}</h2>}
    {message && <p className="mb-4 text-gray-100">{message}</p>}
    <ModalDialogButtons buttonGroup={buttonGroup} />
  </div>
}

export default OkCancelDialog
