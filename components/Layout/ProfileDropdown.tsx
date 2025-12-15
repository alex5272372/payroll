import Link from 'next/link'
import Image from 'next/image'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MenuSection, navigation } from '@/lib/data/navigation'
import { User } from 'next-auth'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'

const ProfileDropdown = ({ user, roles }: { user?: User, roles?: UserRole[] }) => {
  const authNavigation = navigation.filter(item => {
    if (item.section !== MenuSection.USER)
      return false
    else if (roles) {
      return roles.some((value: UserRole) => !!roleMatrix[item.path]?.[value]?.[CRUD.READ])
    } else {
      return !!roleMatrix[item.path]?.[UserRole.UNAUTHORIZED]?.[CRUD.READ]
    }
  })

  return <>
    <Menu as="div" className="grow flex justify-end h-8">
      <MenuButton className="rounded-full cursor-pointer">
        <Image
          alt="Avatar"
          src={user?.image ?? '/user.png'}
          className="rounded-full"
          height={32}
          width={32}
        />
      </MenuButton>

      <MenuItems
        anchor={{ to: 'bottom end', gap: 8 }}
        className="rounded-md bg-gray-900 text-gray-300"
      >
        {authNavigation.map(item =>
          <MenuItem key={item.path}>
            <Link
              className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white cursor-pointer"
              href={item.path}
            >
              <item.icon className='h-6' />
              <p className='ml-2'>{item.name}</p>
            </Link>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  </>
}

export default ProfileDropdown
