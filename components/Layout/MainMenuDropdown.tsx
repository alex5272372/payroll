import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MenuItem as MenuItemType } from '@/lib/data/navigation'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'

const MainMenuDropdown = ({ item, roles }: { item: MenuItemType, roles?: UserRole[] }) => {
  const authNavigation = item.items?.filter(item => {
    if (roles) {
      return roles.some((value: UserRole) => roleMatrix[item.path][value][CRUD.READ])
    } else {
      return roleMatrix[item.path][UserRole.UNAUTHORIZED][CRUD.READ]
    }
  })

  return (
    <Menu as="div" className="h-8">
      <MenuButton
        className={`flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white
          cursor-pointer`}
      >
        <item.icon className='h-6' />
        <p className='hidden md:block ml-2'>{item.name}</p>
      </MenuButton>

      <MenuItems
        anchor={{ to: 'bottom start', gap: 8 }}
        className="rounded-md bg-gray-900 text-gray-300"
      >
        {authNavigation?.map(subItem =>
          <MenuItem key={subItem.path}>
            <Link
              className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white cursor-pointer"
              href={`/${item.path}/${subItem.path}`}
            >
              <subItem.icon className='h-6' />
              <p className='ml-2'>{subItem.name}</p>
            </Link>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  )
}

export default MainMenuDropdown
