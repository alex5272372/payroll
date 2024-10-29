import { Tab, TabGroup, TabList } from '@headlessui/react'

const Header = ({ tabs }: { tabs: { id: string, name: string, active?: boolean }[] }) => {
  return (
    <header className="py-2 px-4 bg-gray-600">
      <TabGroup>
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab.id} className="px-3 py-1 bg-gray-700 text-gray-100 ">
              {tab.name}
            </Tab>))
          }
        </TabList>
      </TabGroup>
    </header>
  )
}

export default Header
