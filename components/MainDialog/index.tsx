import Link from 'next/link'
import { Button } from '@headlessui/react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState, ButtonState, HeroIcon } from '@/types'

const MainDialog = ({
  children,
  Icon,
  title,
  buttonGroup,
  onClose,
}: {
  children: React.ReactNode
  Icon?: HeroIcon
  title?: string
  buttonGroup?: ButtonGroupState
  onClose?: () => void
}) => {
  return <div className="fixed inset-0 flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-400 opacity-50 z-10"></div>
    <div className="flex flex-col z-20">
      <div className="flex justify-between py-1 px-2 rounded-t-md bg-gray-800">
        <div className="flex text-gray-200">
          {Icon
            ? <Icon className="h-6" />
            : <InformationCircleIcon className="h-6" />}
          <p className="ml-2">{title || 'Information'}</p>
        </div>
        <Button onClick={onClose}>
          <XMarkIcon className="h-6 cursor-pointer bg-gray-900 text-gray-300 hover:bg-gray-700" />
        </Button>
      </div>

      <form
        action={buttonGroup?.buttons[buttonGroup.submitButton || 0].onClick}
        className="flex flex-col items-end p-4 space-y-4 rounded-b-md bg-gray-600"
      >
        {children}

        <div className="flex self-center flex-row space-x-2">
          {buttonGroup?.buttons.map((button: ButtonState, index: number) => button.href
            ? button.disabled
              ? <div
                key={index}
                className="flex py-1 px-2 rounded-md bg-gray-900 text-gray-300"
              >
                <button.Icon className="h-6" />
                <p className="ml-2">{button.title}</p>
              </div>

              : <Link
                key={index}
                href={button.href}
                className={`flex self-center py-1 px-2 rounded-md bg-gray-900 text-gray-300
                  hover:bg-gray-700 hover:text-white cursor-pointer`}
              >
                <button.Icon className="h-6" />
                <p className="ml-2">{button.title}</p>
              </Link>

            : <Button
              key={index}
              type={index === buttonGroup.submitButton ? 'submit' : 'button'}
              className={`flex self-center py-1 px-2 rounded-md bg-gray-900 text-gray-300
                ${!button.disabled && 'hover:bg-gray-700 hover:text-white cursor-pointer'}`}
              disabled={button.disabled}
              onClick={button.onClick}
            >
              <button.Icon className="h-6" />
              <p className="ml-2">{button.title}</p>
            </Button>
          )}
        </div>
      </form>
    </div>
  </div>
}

export default MainDialog
