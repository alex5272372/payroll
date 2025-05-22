'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MenuItem } from '@/types'
import { navigation } from '@/lib';
import MainTabs from './MainTabs'
import MainMenuDropdown from './MainMenuDropdown';
import ProfileDropdown from './ProfileDropdown';

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const { data: session } = useSession()
  const authNavigation = navigation.main.filter(item => (session?.user ? item.auth !== false : !item.auth))
  
  return <>
    <nav className={'flex space-x-4 py-2 px-4 bg-gray-800'}>
      <Link href="/">
        <Image
          alt="Logo"
          src="/logo.png"
          className="h-8 w-8 rounded-md cursor-pointer"
          height={32}
          width={32}
        />
      </Link>

      {authNavigation.map((item: MenuItem) => <MainMenuDropdown key={item.path} item={item}></MainMenuDropdown>)}
      <ProfileDropdown />
    </nav>

    <MainTabs />
    {children}
  </>
}

export default Layout
