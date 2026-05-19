import { CheckIcon } from '@heroicons/react/24/outline'
import type { ButtonGroupState } from '@/types'
import ModalDialogButtons from '@/components/overlay/ModalDialog/ModalDialogButtons'
import { useOverlay } from '@/components/overlay/OverlayContext'

const OkDialog = ({
  header,
  message,
}: {
  header?: string
  message?: string
}) => {
  const { hideDialog } = useOverlay()

  const onOk = () => {
    hideDialog()
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: CheckIcon,
        title: 'OK',
        onClick: onOk,
      },
    ],
  }

  return <div className='flex flex-col items-center p-4 rounded-b-md bg-gray-600'>
    {header && <h2 className="text-2xl text-gray-100">{header}</h2>}
    {message && <p className="mb-4 text-gray-100">{message}</p>}
    <ModalDialogButtons buttonGroup={buttonGroup} />
  </div>
}

export default OkDialog
