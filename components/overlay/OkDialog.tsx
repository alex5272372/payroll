import { CheckIcon } from '@heroicons/react/24/outline'
import type { ButtonGroupState } from '@/types'
import OverlayDialogButtons from './OverlayDialogButtons'

const OkDialog = ({
  header,
  message,
  onOk,
}: {
  header?: string
  message?: string
  onOk?: () => void
}) => {
  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: CheckIcon,
        title: 'OK',
        onClick: onOk,
      },
    ],
  }

  return <>
    <div className='flex flex-col items-center'>
      {header && <h2 className="text-2xl text-gray-100">{header}</h2>}
      {message && <p className="text-gray-100">{message}</p>}
    </div>
    <OverlayDialogButtons buttonGroup={buttonGroup} />
  </>
}

export default OkDialog
