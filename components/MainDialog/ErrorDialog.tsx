import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import type { ButtonGroupState } from '@/types'
import { ErrorTree } from '@/types/overlay'

const ErrorDialog = ({
  errorTree,
  onClose,
  onOk,
}: {
  errorTree?: ErrorTree
  onClose?: () => void
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

  return <MainDialog
    Icon={ExclamationTriangleIcon}
    title={'Error'}
    buttonGroup={buttonGroup}
    onClose={onClose}
  >
    <div className='flex flex-col'>
      {errorTree?.errors.map((error, index) =>
        <h2 className="text-2xl text-gray-100" key={`${index}`}>
          {error}
        </h2>
      )}
      {Object.entries(errorTree?.properties ?? {}).map(([key, value]) =>
        <div key={key}>
          <h3 className="text-xl text-gray-100">{key}</h3>
          {value?.errors.map((error, index) =>
            <div className="text-gray-100" key={`${key}-${index}`}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  </MainDialog>
}

export default ErrorDialog
