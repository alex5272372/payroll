import { CheckIcon } from '@heroicons/react/24/outline'
import type { ButtonGroupState } from '@/types'
import { ErrorTree } from '@/types/overlay'
import OverlayDialogButtons from './OverlayDialogButtons'

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

  return <>
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
    <OverlayDialogButtons buttonGroup={buttonGroup} />
  </>
}

export default ErrorDialog
