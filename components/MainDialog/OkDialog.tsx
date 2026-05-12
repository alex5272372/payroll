import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import type { ButtonGroupState } from '@/types'
import { DialogType } from '@/types/enums/overlay'

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
  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: CheckIcon,
        title: 'OK',
        onClick: onOk,
      },
    ],
  }

  if (type === DialogType.OK_CANCEL) {
    buttonGroup.buttons.push({
      Icon: XMarkIcon,
      title: 'Cancel',
      onClick: onCancel,
    })
  }

  return <MainDialog
    Icon={InformationCircleIcon}
    title={type === DialogType.OK_CANCEL ? 'Confirmation' : 'Information'}
    buttonGroup={buttonGroup}
    onClose={onClose}
  >
    <div className='flex flex-col items-center'>
      {header && <h2 className="text-2xl text-gray-100">{header}</h2>}
      {message && <p className="text-gray-100">{message}</p>}
    </div>
  </MainDialog>
}

export default OkDialog
