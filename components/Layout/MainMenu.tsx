import React from 'react'
import Image from 'next/image'
import { MenuItem } from '@/types'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const MainMenu = (
  { authNavigation, authUserNavigation }:
  { authNavigation: MenuItem[]; authUserNavigation: MenuItem[]; }
) => {
  const { data: session } = useSession()

  return <nav className={'flex space-x-4 py-2 px-4 bg-gray-800'}>
    <Link href="/">
      <Image
        alt="Logo"
        src="/logo.png"
        className="h-8 w-8 rounded-md cursor-pointer"
        height={32}
        width={32}
      />
    </Link>

    {authNavigation.map((item: MenuItem) =>
      <MainMenuDropdown key={item.path} item={item}></MainMenuDropdown>)}

    <ProfileDropdown
      navigation={authUserNavigation || []}
      user={session?.user}
    ></ProfileDropdown>
  </nav>
}

export default MainMenu
