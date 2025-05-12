import { Tab, TabList } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TabItem, TabState } from '@/types'
import { menuItemIcons } from '@/lib'

const Header = ({ tabState }: { tabState: TabState }) => {
  
  return (
    <TabList as="header" className="flex h-10 space-x-2 pt-2 px-4 bg-gray-600">
      {tabState.tabs.map((tab: TabItem) => {
        const Icon = menuItemIcons[tab.icon]
        return (<Tab key={tab.id} className={`flex items-center h-8 py-1 px-2 rounded-t-md bg-gray-700 text-gray-100
        hover:bg-gray-500 data-[selected]:bg-gray-100 data-[selected]:text-gray-900`}>
          <Icon className='h-6'></Icon>
          <p className='hidden md:block ml-2'>{tab.name}</p>
          <XMarkIcon className='h-5 ml-2'></XMarkIcon>
        </Tab>)
      })}
    </TabList>
  )
}

export default Header
