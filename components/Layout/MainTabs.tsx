import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { NavMenuItem, TabItem } from '@/types/navigation'
import { navigation } from '@/lib/data/navigation'
import { useOverlay } from '@/components/overlay/OverlayContext'

const MainTabs = () => {
  const { tabState, closeTab } = useOverlay()

  const onCloseTab = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()
    closeTab(index)
  }

  const mapTabs = (tab: TabItem, index: number) => {
    const menuItem: NavMenuItem | undefined = navigation.find((item: NavMenuItem) => tab.menuPath === item.path)

    return <div
      key={index}
      className={`flex items-center h-8 py-1 px-2 rounded-t-md ${
        index === tabState.activeTab
          ? 'bg-gray-100 text-gray-900'
          : 'bg-gray-700 text-gray-100 hover:bg-gray-500'}`}
    >
      <Link
        href={tab.menuPath}
        className={`flex ${index !== tabState.activeTab && 'cursor-pointer'}`}
      >
        {menuItem && <menuItem.icon className='h-6' />}
        <p className='hidden md:block ml-2'>{menuItem?.name || '#'}</p>
      </Link>

      <XMarkIcon
        className={`ml-2 h-5 cursor-pointer ${index === tabState.activeTab
          ? 'hover:bg-gray-300'
          : 'hover:bg-gray-700'}`}
        onClick={e => onCloseTab(e, index)}
      />
    </div>
  }

  return <header className="flex h-10 space-x-2 pt-2 px-4 bg-gray-600">
    {tabState.tabs.map(mapTabs)}
  </header>
}

export default MainTabs
