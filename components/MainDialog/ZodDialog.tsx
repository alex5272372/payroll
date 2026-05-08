import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import MainDialog from '.'
import type { ButtonGroupState } from '@/types'
import type { $ZodErrorTree } from 'zod/v4/core'

const ZodDialog = ({
  zodError,
  onClose,
  onOk,
}: {
  zodError?: $ZodErrorTree<object>
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

  const properties = zodError?.properties as Record<string, { errors: string[] }> | undefined

  return <MainDialog
    Icon={ExclamationTriangleIcon}
    title={'Error'}
    buttonGroup={buttonGroup}
    onClose={onClose}
  >
    <div className='flex flex-col'>
      {Object.entries(properties ?? {}).map(([key, value]) =>
        <div key={key}>
          <h3 className="text-xl text-gray-100">{key}</h3>
          {value.errors.map((error, index) =>
            <div className="text-gray-100" key={`${key}-${index}`}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  </MainDialog>
}

export default ZodDialog
