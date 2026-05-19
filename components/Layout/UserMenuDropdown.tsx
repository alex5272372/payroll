import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { MenuSection } from '@/types/enums/navigation'
import { navigation } from '@/lib/data/navigation'
import { User } from 'next-auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import MenuDropdownItem from '@/components/Layout/MenuDropdownItem'

const UserMenuDropdown = ({ user, roles }: { user?: User, roles?: UserRole[] }) => {
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
        {authNavigation.map(item => <MenuDropdownItem key={item.path} item={item} />)}
      </MenuItems>
    </Menu>
  </>
}

export default UserMenuDropdown
