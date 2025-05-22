import { Button } from '@headlessui/react'
import { IdentificationIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HeroIcon } from '@/types'

const MainDialog = (
  { children, action, ButtonIcon, buttonText }:
  { children: React.ReactNode; action: (formData: FormData) => void; ButtonIcon: HeroIcon; buttonText: string; }
) => {
  return <main className="flex items-center justify-center h-screen">
    <div className="flex flex-col">
      <div className="flex justify-between py-1 px-2 rounded-t-md bg-gray-800">
        <div className="flex text-gray-200">
          <IdentificationIcon className="h-6" />
          <p className="ml-2">User</p>
        </div>
        <XMarkIcon
          className="h-6 cursor-pointer bg-gray-900 text-gray-300 hover:bg-gray-700"
        />
      </div>

      <form action={action} className="flex flex-col items-end p-4 space-y-4 rounded-b-md bg-gray-600">
        {children}

        <Button
          type="submit"
          className={`flex self-center py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 
            hover:text-white cursor-pointer`}
        >
          <ButtonIcon className="h-6" />
          <p className="ml-2">{buttonText}</p>
        </Button>
      </form>
    </div>
  </main>
}

export default MainDialog
