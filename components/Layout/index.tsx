import React from 'react'
import Header from './Header'
import { Disclosure } from '@headlessui/react'
import MainMenuItem from './MainMenuItem'
import ProfileDropdown from './ProfileDropdown'
import MobileMenu from './MobileMenu'
import { auth } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentIcon,
  DocumentTextIcon,
  HomeModernIcon,
  GlobeEuropeAfricaIcon,
  IdentificationIcon,
  UserIcon,
  UserGroupIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { MenuItem } from '@/types'

const userNavigation: MenuItem[] = [
  { id: 'profile', name: 'Profile', auth: true, icon: UserIcon },
  { id: 'signOut', name: 'Sign out', auth: true, icon: ArrowRightStartOnRectangleIcon },
  { id: 'signIn', name: 'Sign in', auth: false, icon: ArrowRightEndOnRectangleIcon },
]

const navigation: MenuItem[] = [
  { id: 'calendar', name: 'Calendars', icon: CalendarIcon, items: [
    { id: 'country', name: 'Country calendar', icon: GlobeEuropeAfricaIcon },
    { id: 'company', name: 'Company calendar', icon: HomeModernIcon },
    { id: 'department', name: 'Department calendar', icon: UserGroupIcon },
    { id: 'employee', name: 'Employee calendar', icon: IdentificationIcon },
  ] },
  { id: 'catalog', name: 'Catalogs', icon: ViewColumnsIcon, auth: true, items: [
    { id: 'countries', name: 'Countries', icon: ViewColumnsIcon },
    { id: 'companies', name: 'Companies', icon: ViewColumnsIcon },
    { id: 'departments', name: 'Departments', icon: ViewColumnsIcon },
    { id: 'employees', name: 'Employees', icon: ViewColumnsIcon },
    { id: 'people', name: 'People', icon: ViewColumnsIcon },
    { id: 'users', name: 'Users', icon: ViewColumnsIcon },
  ] },
  { id: 'document', name: 'Documents', icon: DocumentTextIcon, auth: true, items: [
    { id: 'calendarFilling', name: 'Calendar filling', icon: DocumentTextIcon },
    { id: 'calculationTemplate', name: 'Calculation template', icon: DocumentIcon },
    { id: 'payrollCalculation', name: 'Payroll calculation', icon: DocumentTextIcon },
  ] },
  { id: 'report', name: 'Reports', icon: ChartBarIcon, auth: true, items: [
    { id: 'payslip', name: 'Payslip', icon: ChartBarIcon },
    { id: 'paymentStatement', name: 'Payment statement', icon: ChartBarIcon },
  ] },
]

const tabs = [
  { id: 'calendar', name: 'Calendar', active: true },
  { id: 'users', name: 'Users' },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const session = await auth()
  const authUserNavigation = userNavigation.filter(item => session?.user ? item.auth !== false : !item.auth)
  const authNavigation = navigation.filter(item => session?.user ? item.auth !== false : !item.auth)

  return <>
    <Disclosure>
      <nav className="flex space-x-4 py-2 px-4 bg-gray-800">
        <Link href="/">
          <Image
            alt="Company"
            src="/next.svg"
            className="h-8 w-32"
            height={32}
            width={128}
          />
        </Link>

        {authNavigation.map((item) => <MainMenuItem key={item.id} item={item}></MainMenuItem>)}

        <ProfileDropdown
          navigation={authUserNavigation}
          user={session?.user}
        ></ProfileDropdown>
      </nav>

      <MobileMenu navigation={authUserNavigation}></MobileMenu>
    </Disclosure>

    <Header tabs={tabs} />
    {children}
  </>
}

export default Layout
