import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MenuItem, TabItem, TabState } from '@/types'
import { getMenuItem } from '@/lib'

const Header = (
  { tabState, setTabState }:
  { tabState: TabState, setTabState: React.Dispatch<React.SetStateAction<TabState>> }
) => {
  const router = useRouter()

  const closeTab = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()

    const tabs: TabItem[] = tabState.tabs.filter((_, i: number) => i !== index)
    const activeTab: number | null =
      tabState.activeTab === null || tabs.length === 0 ? null
        : tabState.activeTab > 0 || tabState.activeTab > index || tabState.activeTab === tabs.length
          ? tabState.activeTab - 1 : tabState.activeTab

    const newTabState: TabState = { tabs, activeTab }
    localStorage.setItem('tabState', JSON.stringify(newTabState))

    if (index === tabState.activeTab)
      router.push(activeTab === null ? '/' : `/${tabs[activeTab].menuPath.join('/')}`)
    else
      setTabState(newTabState)
  }

  const mapTabs = (tab: TabItem, index: number) => {
    const menuItem: MenuItem | null = getMenuItem(tab.menuPath)

    return <div
      key={index}
      className={`flex items-center h-8 py-1 px-2 rounded-t-md ${
        index === tabState.activeTab
          ? 'bg-gray-100 text-gray-900'
          : 'bg-gray-700 text-gray-100 hover:bg-gray-500'}`}
    >
      <Link
        href={`/${tab.menuPath.join('/')}`}
        className={`flex ${index !== tabState.activeTab && 'cursor-pointer'}`}
      >
        {menuItem && <menuItem.icon className='h-6' />}
        <p className='hidden md:block ml-2'>{menuItem?.name || '#'}</p>
      </Link>

      <XMarkIcon
        className={`ml-2 h-5 cursor-pointer ${index === tabState.activeTab
          ? 'hover:bg-gray-300'
          : 'hover:bg-gray-700'}`}
        onClick={e => closeTab(e, index)}
      />
    </div>
  }

  return <header className="flex h-10 space-x-2 pt-2 px-4 bg-gray-600">
    {tabState.tabs.map(mapTabs)}
  </header>
}

export default Header
