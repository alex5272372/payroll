import { CheckIcon } from '@heroicons/react/24/outline'
import type { ButtonGroupState } from '@/types'
import { ErrorTree } from '@/types/overlay'
import ModalDialogButtons from '@/components/overlay/ModalDialog/ModalDialogButtons'

const ErrorDialog = ({
  errorTree,
  onOk,
}: {
  errorTree?: ErrorTree
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

  return <div className='flex flex-col items-center p-4 space-y-4 rounded-b-md bg-gray-600'>
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
    <ModalDialogButtons buttonGroup={buttonGroup} />
  </div>
}

export default ErrorDialog
