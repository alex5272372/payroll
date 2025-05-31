import { useRouter } from 'next/navigation'
import { Button } from '@headlessui/react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DialogButtonState, HeroIcon } from '@/types'

const MainDialog = (
  { children, Icon, title, buttons }:
  { children: React.ReactNode; Icon?: HeroIcon; title?: string; buttons: DialogButtonState[]; }
) => {
  const router = useRouter()
  const submitButton = buttons.find((button) => button.action)

  return <main className="flex items-center justify-center h-screen">
    <div className="flex flex-col">
      <div className="flex justify-between py-1 px-2 rounded-t-md bg-gray-800">
        <div className="flex text-gray-200">
          {Icon
            ? <Icon className="h-6" />
            : <InformationCircleIcon className="h-6" />}
          <p className="ml-2">{title || 'Information'}</p>
        </div>
        <XMarkIcon
          className="h-6 cursor-pointer bg-gray-900 text-gray-300 hover:bg-gray-700"
          onClick={() => router.back()}
        />
      </div>

      <form action={submitButton?.action} className="flex flex-col items-end p-4 space-y-4 rounded-b-md bg-gray-600">
        {children}

        {buttons.map((button, index) =>
          <Button
            key={index}
            type={button.action ? 'submit' : 'button'}
            className={`flex self-center py-1 px-2 rounded-md bg-gray-900 text-gray-300
              ${!button.disabled && 'hover:bg-gray-700 hover:text-white cursor-pointer'}`}
            disabled={button.disabled}
            onClick={button.onClick}
          >
            <button.Icon className="h-6" />
            <p className="ml-2">{button.title}</p>
          </Button>
        )}
      </form>
    </div>
  </main>
}

export default MainDialog
