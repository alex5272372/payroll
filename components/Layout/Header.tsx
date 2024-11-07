import { Tab, TabGroup, TabList } from '@headlessui/react'

const Header = ({ tabs }: { tabs: { id: string, name: string, active?: boolean }[] }) => {
  return (
    <header className="py-2 px-4 bg-gray-600">
      <TabGroup>
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab.id} className="py-1 px-3 bg-gray-700 text-gray-100 ">
              {tab.name}
            </Tab>))
          }
        </TabList>
      </TabGroup>
    </header>
  )
}

export default Header
