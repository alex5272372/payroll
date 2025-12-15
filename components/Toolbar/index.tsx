import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@headlessui/react'
import { MenuItemPath } from '@/lib/data/navigation'
import { AllPermissions, CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { ButtonState } from '@/types'

const Toolbar = ({ buttons, menuPath }: { buttons: ButtonState[]; menuPath: MenuItemPath; }) => {
  const { data: session } = useSession()

  return <nav className={'flex space-x-2 pt-2 px-2 bg-gray-100'}>
    {buttons.map((button, index) => {
      const disabled = button.disabled || !button.permission || !session?.roles?.some((role: UserRole) =>
        !!(roleMatrix[menuPath]?.[role] as AllPermissions | undefined)?.[button.permission as CRUD])

      if (button.href) {
        if (disabled) {
          return <div
            key={index}
            className="flex py-1 px-2 rounded-md border bg-gray-300 text-gray-900"
          >
            <button.Icon className="h-6" />
            <p className='hidden md:block ml-2'>{button.title}</p>
          </div>

        } else {
          return <Link
            key={index}
            href={button.href}
            className="flex py-1 px-2 rounded-md border bg-gray-300 text-gray-900 hover:bg-gray-400 cursor-pointer"
          >
            <button.Icon className="h-6" />
            <p className='hidden md:block ml-2'>{button.title}</p>
          </Link>
        }

      } else {
        return <Button
          key={index}
          type={button.action ? 'submit' : 'button'}
          className={`flex py-1 px-2 rounded-md border bg-gray-300 text-gray-900
            ${!disabled && 'hover:bg-gray-400 cursor-pointer'}`}
          disabled={disabled}
          onClick={button.onClick}
        >
          <button.Icon className="h-6" />
          <p className="ml-2">{button.title}</p>
        </Button>
      }
    })}
  </nav>
}

export default Toolbar
