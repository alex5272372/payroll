import Image from 'next/image'
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { userNavigationAction } from '@/actions/userActions'
import { User } from 'next-auth'
import { MenuItem } from '@/types'

const ProfileDropdown = ({ navigation, user }: {
  navigation: MenuItem[],
  user?: User
}) => {
  return <>
    <Menu as="div" className="grow flex justify-end h-8">
      <MenuButton className="rounded-full cursor-pointer">
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
        {navigation.map(item => {
          return (<form key={item.path} action={userNavigationAction.bind(null, item.path)}>
            <button
              type="submit"
              className="flex w-full py-2 px-4 text-left hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              <item.icon className='h-6' />
              <p className='ml-2'>{item.name}</p>
            </button>
          </form>)
        })}
      </MenuItems>
    </Menu>
  </>
}

export default ProfileDropdown
