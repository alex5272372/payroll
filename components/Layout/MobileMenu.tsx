import { CloseButton, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link'

const MobileMenu = async ({ navigation }: {
  navigation: { id: string, name: string }[]
}) => {
  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 px-3 bg-gray-900 text-gray-300">
        {navigation.map((item) => (
          <CloseButton
            key={item.id}
            as={Link}
            href={`/${item.id}`}
            className="block px-3 py-1 rounded-md hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </CloseButton>
        ))}
      </div>
    </DisclosurePanel>
  )
}

export default MobileMenu
