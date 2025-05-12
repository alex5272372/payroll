import { Tab, TabList } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TabItem, TabState } from '@/types'
import { menuItemIcons } from '@/lib'
import { useRouter } from 'next/navigation'

const Header = (
  { tabState, setTabState }:
  { tabState: TabState, setTabState: React.Dispatch<React.SetStateAction<TabState>> }
) => {
  const router = useRouter()

  return (
    <TabList as="header" className="flex h-10 space-x-2 pt-2 px-4 bg-gray-600">
      {tabState.tabs.map((tab: TabItem, i: number) => {
        const Icon = menuItemIcons[tab.icon]
        return (<Tab key={tab.id} className={`flex items-center h-8 py-1 px-2 rounded-t-md bg-gray-700 text-gray-100
        hover:bg-gray-500 data-[selected]:bg-gray-100 data-[selected]:text-gray-900`}>
          <Icon className='h-6'></Icon>
          <p className='hidden md:block ml-2'>{tab.name}</p>
          <XMarkIcon className='ml-2 h-5' onClick={e => {
            e.stopPropagation()
            const newTabs = tabState.tabs.filter((t: TabItem) => t.id !== tab.id)
            const newActiveTab = newTabs.length > 0 ? newTabs.length - 1 : null
            const newTabState = { tabs: newTabs, activeTab: newActiveTab }
            localStorage.setItem('tabState', JSON.stringify(newTabState))
            if (i === tabState.activeTab)
              router.push(newActiveTab === null
                ? '/' : `/${newTabs[newActiveTab].parentId}/${newTabs[newActiveTab].id}`)
            else
              setTabState(newTabState)
          }}/>
        </Tab>)
      })}
    </TabList>
  )
}

export default Header
