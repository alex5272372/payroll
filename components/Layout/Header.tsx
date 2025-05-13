import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MenuItem, TabItem, TabState } from '@/types'
import { getMenuItem } from '@/lib'

const Header = (
  { tabState, setTabState }:
  { tabState: TabState, setTabState: React.Dispatch<React.SetStateAction<TabState>> }
) => {
  const router = useRouter()

  const activateTab = (index: number) => {
    const newTabState = { ...tabState, activeTab: index }
    localStorage.setItem('tabState', JSON.stringify(newTabState))
    router.push(`/${tabState.tabs[index].parentId}/${tabState.tabs[index].id}`)
  }

  const closeTab = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()

    const newTabs = tabState.tabs.filter((t: TabItem) => t.id !== tabState.tabs[index].id)
    const newActiveTab = newTabs.length > 0 ? newTabs.length - 1 : null
    const newTabState = { tabs: newTabs, activeTab: newActiveTab }
    localStorage.setItem('tabState', JSON.stringify(newTabState))

    if (index === tabState.activeTab)
      router.push(newActiveTab === null
        ? '/' : `/${newTabs[newActiveTab].parentId}/${newTabs[newActiveTab].id}`)
    else
      setTabState(newTabState)
  }

  const mapTabs = (tab: TabItem, index: number) => {
    const menuItem: MenuItem | null = getMenuItem(tab.menu, tab.id, tab.parentId)

    return <div
      key={tab.id}
      className={`flex items-center h-8 py-1 px-2 rounded-t-md ${
        index === tabState.activeTab
          ? 'bg-gray-100 text-gray-900'
          : 'bg-gray-700 text-gray-100 hover:bg-gray-500'}`}
    >
      <button
        className={`flex ${index !== tabState.activeTab && 'cursor-pointer'}`}
        onClick={() => activateTab(index)}
      >
        {menuItem && <menuItem.icon className='h-6' />}
        <p className='hidden md:block ml-2'>{menuItem?.name || '#'}</p>
      </button>

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
