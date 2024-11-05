import Image from 'next/image'
import { DisclosureButton, Menu, MenuButton, MenuItems } from '@headlessui/react'
import { userNavigationAction } from './actions'
import { User } from 'next-auth'

const ProfileDropdown = async ({ navigation, user }: {
  navigation: { id: string, name: string }[],
  user?: User
}) => {
  return <>
    <div className="grow flex justify-end  md:hidden rounded-full">
      <DisclosureButton className="rounded-full">
        <Image
          alt="Avatar"
          src={user && user.image ? user.image : '/user.png'}
          className="rounded-full"
          height={32}
          width={32}
        />
      </DisclosureButton>
    </div>

    <Menu as="div" className="grow hidden md:flex justify-end h-8">
      <MenuButton className="rounded-full">
        <Image
          alt="Avatar"
          src={user && user.image ? user.image : '/user.png'}
          className="rounded-full"
          height={32}
          width={32}
        />
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom end', gap: 8 }}
        className="rounded-md bg-gray-900 text-gray-300"
      >
        {navigation.map(item => (
          <form key={item.id} action={userNavigationAction.bind(null, item.id)}>
            <button
              type="submit"
              className="w-full px-4 py-2 text-left hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </button>
          </form>
        ))}
      </MenuItems>
    </Menu>
  </>
}

export default ProfileDropdown
