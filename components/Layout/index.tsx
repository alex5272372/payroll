'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { MenuSection } from '@/types/enums/layout'
import type { NavMenuItem } from '@/types/layout'
import { NAVIGATION } from '@/data/navigation'
import MainTabs from '@/components/Layout/MainTabs'
import MainMenuDropdown from '@/components/Layout/MainMenuDropdown'
import UserMenuDropdown from '@/components/Layout/UserMenuDropdown'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ROLE_MATRIX } from '@/data/roleMatrix'
import ModalDialog from '@/components/ModalDialog'

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const { data: session } = useSession()
  const authNavigation = NAVIGATION.filter((item: NavMenuItem) => {
    if (item.section !== MenuSection.MAIN || item.parent)
      return false
    else if (session?.roles) {
      return session.roles.some((value: UserRole) => !!ROLE_MATRIX[item.path]?.[value]?.[CRUD.READ])
    } else {
      return !!ROLE_MATRIX[item.path]?.[UserRole.UNAUTHORIZED]?.[CRUD.READ]
    }
  })

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

      {authNavigation.map((item: NavMenuItem) =>
        <MainMenuDropdown key={item.path} menuItem={item} roles={session?.roles}></MainMenuDropdown>)}
      <UserMenuDropdown user={session?.user} roles={session?.roles} />
    </nav>

    <MainTabs />
    {children}
    <ModalDialog />
  </>
}

export default Layout
