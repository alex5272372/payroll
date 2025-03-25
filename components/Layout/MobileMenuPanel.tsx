import { MenuItem } from '@/types'
import { CloseButton, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link'

const MobileMenuPanel = async ({ item }: { item: MenuItem }) => {
  return (
    <DisclosurePanel className="md:hidden space-y-2 py-2 px-4 bg-gray-800">
      {item.items && item.items.map((i: MenuItem) => (
        <CloseButton
          key={i.id}
          as={Link}
          href={`/${item.id}/${i.id}`}
          className="flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <i.icon className='h-6'></i.icon>
          <p className='ml-2'>{i.name}</p>
        </CloseButton>
      ))}
    </DisclosurePanel>
  )
}

export default MobileMenuPanel
