import { MenuItem as MenuItemType, TabState } from '@/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter } from 'next/navigation'

const MainMenuDropdown = ({ item, tabState }: { item: MenuItemType, tabState: TabState}) => {
  const router = useRouter()

  return (
    <Menu as="div" className="h-8">
      <MenuButton className="flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white">
        <item.icon className='h-6' />
        <p className='hidden md:block ml-2'>{item.name}</p>
      </MenuButton>

      <MenuItems
        anchor={{ to: 'bottom start', gap: 8 }}
        className="rounded-md bg-gray-900 text-gray-300"
      >
        {item.items?.map(subItem => {
          return (<MenuItem key={subItem.id}>
            <button
              className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white"
              onClick={() => {
                localStorage.setItem('tabState', JSON.stringify({
                  tabs: [...tabState.tabs,
                    { menu: 'main', id: subItem.id, parentId: item.id }],
                  activeTab: tabState.activeTab === null ? 0 : tabState.activeTab + 1
                }))
                router.push(`/${item.id}/${subItem.id}`)
              }}
            >
              <subItem.icon className='h-6' />
              <p className='ml-2'>{subItem.name}</p>
            </button>
          </MenuItem>)
        })}
      </MenuItems>
    </Menu>
  )
}

export default MainMenuDropdown
