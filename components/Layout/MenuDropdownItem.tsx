import Link from 'next/link'
import { Button, MenuItem } from '@headlessui/react'
import type { NavMenuItem } from '@/types/navigation'
import { MenuItemType } from '@/types/enums/navigation'
import { useOverlay } from '@/components/overlay/OverlayContext'

const MenuDropdownItem = ({ item }: { item: NavMenuItem }) => {
  const { showDialog } = useOverlay()

  return <MenuItem>
    { item.type === MenuItemType.PATH ?
      <Link
        className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white cursor-pointer"
        href={item.path as string}
      >
        <item.icon className='h-6' />
        <p className='ml-2'>{item.name}</p>
      </Link>
      :
      <Button
        type="button"
        className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white cursor-pointer"
        onClick={() => {
          if (item.component) {
            showDialog(<item.component />, item.icon, item.name)
          }
        }}
      >
        <item.icon className='h-6' />
        <p className='ml-2'>{item.name}</p>
      </Button>
    }
  </MenuItem>
}

export default MenuDropdownItem
