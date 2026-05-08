'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { MenuSection } from '@/types/enums/navigation'
import type { MenuItem } from '@/types/navigation'
import { navigation } from '@/lib/data/navigation'
import MainTabs from './MainTabs'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import MainDialog from '@/components/MainDialog'
import OkDialog from '@/components/MainDialog/OkDialog'
import { useOverlay } from '@/components/OverlayContext'

const Layout = ({ children }: { children: React.ReactNode; }) => {
  const { data: session } = useSession()
  const { dialog } = useOverlay()
  const authNavigation = navigation.filter((item: MenuItem) => {
    if (item.section !== MenuSection.MAIN || item.parent)
      return false
    else if (session?.roles) {
      return session.roles.some((value: UserRole) => !!roleMatrix[item.path]?.[value]?.[CRUD.READ])
    } else {
      return !!roleMatrix[item.path]?.[UserRole.UNAUTHORIZED]?.[CRUD.READ]
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

      {authNavigation.map((item: MenuItem) =>
        <MainMenuDropdown key={item.path} menuItem={item} roles={session?.roles}></MainMenuDropdown>)}
      <ProfileDropdown user={session?.user} roles={session?.roles} />
    </nav>

    <MainTabs />
    {children}

    {dialog.type && dialog.type === 'main' &&
      <MainDialog
        Icon={dialog.icon}
        title={dialog.title}
        buttonGroup={dialog.buttonGroup}
        onClose={dialog.onClose}
      >
        {dialog.children}
      </MainDialog>}

    {dialog.type && dialog.type !== 'main' &&
      <OkDialog
        type={dialog.type}
        header={dialog.header}
        message={dialog.message}
        onClose={dialog.onClose}
        onOk={dialog.onOk}
        onCancel={dialog.onCancel}
      />}
  </>
}

export default Layout
