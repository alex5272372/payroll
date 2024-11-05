import React from 'react'
import Header from './Header'
import { Disclosure } from '@headlessui/react'
import MainMenu from './MainMenu'
import ProfileDropdown from './ProfileDropdown'
import MobileMenu from './MobileMenu'
import { auth } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ChartBarIcon, DocumentIcon, ViewColumnsIcon } from '@heroicons/react/24/outline'

const userNavigation = [
  { id: 'profile', name: 'Profile', auth: true },
  { id: 'signOut', name: 'Sign out', auth: true },
  { id: 'signIn', name: 'Sign in', auth: false },
]

const navigation = [
  { id: 'calendar', name: 'Calendar', Icon: CalendarIcon },
  { id: 'catalogs', name: 'Catalogs', Icon: ViewColumnsIcon, auth: true },
  { id: 'documents', name: 'Documents', Icon: DocumentIcon, auth: true },
  { id: 'reports', name: 'Reports', Icon: ChartBarIcon, auth: true },
]

const tabs = [
  { id: 'calendar', name: 'Calendar', active: true },
  { id: 'users', name: 'Users' },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const session = await auth()
  const authUserNavigation = userNavigation.filter(item => session?.user ? item.auth !== false : !item.auth)
  const authNavigation = navigation.filter(item => session?.user ? item.auth !== false : !item.auth)

  return (
    <div className="min-h-full">
      <Disclosure>
        <nav className="flex py-2 px-4 bg-gray-800">
          <Link href="/">
            <Image
              alt="Company"
              src="/next.svg"
              className="h-8 w-32"
              height={32}
              width={128}
            />
          </Link>
          <MainMenu navigation={authNavigation}></MainMenu>

          <ProfileDropdown
            navigation={authUserNavigation}
            user={session?.user}
          ></ProfileDropdown>
        </nav>

        <MobileMenu navigation={authUserNavigation}></MobileMenu>
      </Disclosure>

      <Header tabs={tabs} />
      {children}
    </div>
  )
}

export default Layout
