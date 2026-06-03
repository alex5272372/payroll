import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import type { NavMenuItem } from '@/types/layout'
import { NAVIGATION } from '@/data/navigation'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ROLE_MATRIX } from '@/data/roleMatrix'
import MenuDropdownItem from '@/components/Layout/MenuDropdownItem'

const MainMenuDropdown = ({ menuItem, roles }: { menuItem: NavMenuItem, roles?: UserRole[] }) => {
  const authNavigation = NAVIGATION.filter(item => {
    if (item.parent !== menuItem.path)
      return false
    else if (roles) {
      return roles.some((value: UserRole) => !!ROLE_MATRIX[item.path]?.[value]?.[CRUD.READ])
    } else {
      return !!ROLE_MATRIX[item.path]?.[UserRole.UNAUTHORIZED]?.[CRUD.READ]
    }
  })

  return (
    <Menu as="div" className="h-8">
      <MenuButton
        className={`flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white
          cursor-pointer`}
      >
        <menuItem.icon className='h-6' />
        <p className='hidden md:block ml-2'>{menuItem.name}</p>
      </MenuButton>

      <MenuItems
        anchor={{ to: 'bottom start', gap: 8 }}
        className="rounded-md bg-gray-900 text-gray-300"
      >
        {authNavigation?.map(item => <MenuDropdownItem key={item.path} item={item} />)}
      </MenuItems>
    </Menu>
  )
}

export default MainMenuDropdown
