import { MenuItem } from '@/types'
import { CloseButton, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link'

const MobileMenu = async ({ navigation }: { navigation: MenuItem[] }) => {
  return (
    <DisclosurePanel className="md:hidden space-y-2 py-2 px-4 bg-gray-800">
      {navigation.map((item) => (
        <CloseButton
          key={item.id}
          as={Link}
          href={`/${item.id}`}
          className="flex py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <item.icon className='h-6'></item.icon>
          <p className='ml-2'>{item.name}</p>
        </CloseButton>
      ))}
    </DisclosurePanel>
  )
}

export default MobileMenu
