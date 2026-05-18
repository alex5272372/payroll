'use client'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@headlessui/react'
import { useOverlay } from '@/components/overlay/OverlayContext'

const OverlayDialog = () => {
  const { dialog: { isOpen, children, icon, title, onClose }} = useOverlay()
  const Icon = icon

  return isOpen ?
    <div className="fixed inset-0 flex items-center justify-center">
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

        {children}

      </div>
    </div>
    : null
}

export default OverlayDialog
