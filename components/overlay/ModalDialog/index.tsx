'use client'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useOverlay } from '@/components/overlay/OverlayContext'

const ModalDialog = () => {
  const { dialog: { isOpen, children, icon, title }, hideDialog } = useOverlay()
  const Icon = icon

  return <Dialog
    className="fixed inset-0 flex items-center justify-center"
    open={isOpen}
    onClose={hideDialog}
  >
    <DialogBackdrop className="fixed inset-0 bg-gray-400 opacity-50 z-10"></DialogBackdrop>
    <DialogPanel className="flex flex-col z-20">
      <DialogTitle className="flex justify-between py-1 px-2 rounded-t-md bg-gray-800">
        <div className="flex text-gray-200">
          {Icon
            ? <Icon className="h-6" />
            : <InformationCircleIcon className="h-6" />}
          <p className="ml-2">{title || 'Information'}</p>
        </div>
        <Button onClick={hideDialog}>
          <XMarkIcon className="h-6 cursor-pointer bg-gray-900 text-gray-300 hover:bg-gray-700" />
        </Button>
      </DialogTitle>

      {children}

    </DialogPanel>
  </Dialog>
}

export default ModalDialog
