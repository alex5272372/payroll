import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { auth } from '@/auth'
import { MouseEventHandler } from 'react'
import SignIn from '../auth/signin-button'
import SignOut from '../auth/signout-button'

const ProfileDropdown = async ({ userNavigation }: {
  userNavigation: { name: string, onClick: MouseEventHandler<HTMLAnchorElement> }[]
}) => {
  const session = await auth()

  return (
    <div className="ml-4 md:ml-6 hidden md:flex items-center">
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className={`relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              alt=""
              src={session && session.user && session.user.image ? session.user.image : '/user.png'}
              className="h-8 w-8 rounded-full"
              height={32}
              width={32}
            />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg
              ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95
              data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100
              data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
        >
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              <Link
                href=""
                className="block px-4 py-2 text-sm text-gray-800 data-[focus]:bg-gray-200"
              >
                {item.name}
              </Link>
            </MenuItem>
          ))}
          <SignIn></SignIn>
          <SignOut></SignOut>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default ProfileDropdown
