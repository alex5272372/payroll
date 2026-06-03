import Image from 'next/image'
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { MenuSection } from '@/types/enums/layout'
import { NAVIGATION } from '@/data/navigation'
import { User } from 'next-auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ROLE_MATRIX } from '@/data/roleMatrix'
import MenuDropdownItem from '@/components/Layout/MenuDropdownItem'

const UserMenuDropdown = ({ user, roles }: { user?: User, roles?: UserRole[] }) => {
  const authNavigation = NAVIGATION.filter(item => {
    if (item.section !== MenuSection.USER)
      return false
    else if (roles) {
      return roles.some((value: UserRole) => !!ROLE_MATRIX[item.path]?.[value]?.[CRUD.READ])
    } else {
      return !!ROLE_MATRIX[item.path]?.[UserRole.UNAUTHORIZED]?.[CRUD.READ]
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
