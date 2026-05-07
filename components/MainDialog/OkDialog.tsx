import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import { ButtonState, DialogType } from '@/types'

const OkDialog = ({
  type,
  header,
  message,
  onClose,
  onOk,
  onCancel,
}: {
  type: DialogType
  header?: string
  message?: string
  onClose?: () => void
  onOk?: () => void
  onCancel?: () => void
}) => {
  const buttons: ButtonState[] = [
    {
      Icon: CheckIcon,
      title: 'OK',
      onClick: onOk,
    },
  ]

  if (type === 'okCancel') {
    buttons.push({
      Icon: XMarkIcon,
      title: 'Cancel',
      onClick: onCancel,
    })
  }

  return <MainDialog
    Icon={type === 'error' ? ExclamationTriangleIcon : InformationCircleIcon}
    title={type === 'error' ? 'Error' : type === 'okCancel' ? 'Confirmation' : 'Information'}
    buttons={buttons}
    onClose={onClose}
  >
    <div className='flex flex-col items-center'>
      {header && <h2 className="text-2xl text-gray-100">{header}</h2>}
      {message && <p className="text-gray-100">{message}</p>}
    </div>
  </MainDialog>
}

export default OkDialog
