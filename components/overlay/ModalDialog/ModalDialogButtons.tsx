'use client'
import Link from 'next/link'
import { Button } from '@headlessui/react'
import { ButtonGroupState, ButtonState } from '@/types'

const ModalDialogButtons = ({ buttonGroup } : { buttonGroup?: ButtonGroupState }) => {
  return <div className="flex self-center flex-row space-x-2">
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
}

export default ModalDialogButtons
