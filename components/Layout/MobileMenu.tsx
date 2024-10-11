import { classNames } from '@/lib/utils'
import { DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Image from 'next/image'
import { auth } from '@/auth'

const MobileMenu = async ({ navigation, userNavigation }: {
  navigation: { name: string, current: boolean }[],
  userNavigation: { name: string }[]
}) => {
  const session = await auth()

  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href=""
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <Image
              alt=""
              src={session && session.user && session.user.image ? session.user.image : '/user.png'}
              className="h-10 w-10 rounded-full"
              height={32}
              width={32}
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              {session && session.user && session.user.name ? session.user.name : '<Name>'}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              {session && session.user && session.user.email ? session.user.email : '<Email>'}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href=""
              className=
                "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </div>
    </DisclosurePanel>
  )
}

export default MobileMenu
