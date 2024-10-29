import { CloseButton, DisclosurePanel } from '@headlessui/react'
import { User } from 'next-auth'
import Image from 'next/image'
import { userNavigationAction } from './actions'
import Link from 'next/link'

const MobileMenu = async ({ navigation, userNavigation, user }: {
  navigation: { id: string, name: string }[],
  userNavigation: { id: string, name: string }[],
  user?: User
}) => {
  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item) => (
          <CloseButton
            key={item.id}
            as={Link}
            href={`/${item.id}`}
            aria-current={item.id === 'calendar' ? 'page' : undefined}
            className="block px-3 py-1 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </CloseButton>
        ))}
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        {user && <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <Image
              alt="Avatar"
              src={user.image ? user.image : '/user.png'}
              className="h-10 w-10 rounded-full"
              height={32}
              width={32}
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              {user.name ? user.name : '<name>'}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              {user.email ? user.email : '<email>'}
            </div>
          </div>
        </div>}
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map(item => (
            <form
              key={item.id}
              action={userNavigationAction.bind(null, item.id)}
            >
              <button
                type="submit"
                className={`w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-gray-700
                  hover:text-white`}
              >
                {item.name}
              </button>
            </form>
          ))}
        </div>
      </div>
    </DisclosurePanel>
  )
}

export default MobileMenu
