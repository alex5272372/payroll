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
import { MenuItem, Navigation } from '@/types'

export enum MenuType {
  MAIN = 'main',
  USER = 'user',
}

export enum MenuItemPath {
  CALENDAR = 'calendar',
  CATALOG = 'catalog',
  DOCUMENT = 'document',
  REPORT = 'report',
  PROFILE = 'profile',
  SIGN_OUT = 'sign-out',
  SIGN_IN = 'sign-in',
  COUNTRY_CALENDAR = 'country-calendar',
  COMPANY_CALENDAR = 'company-calendar',
  DEPARTMENT_CALENDAR = 'department-calendar',
  EMPLOYEE_CALENDAR = 'employee-calendar',
  COUNTRIES = 'countries',
  COMPANIES = 'companies',
  DEPARTMENTS = 'departments',
  EMPLOYEES = 'employees',
  PEOPLE = 'people',
  USERS = 'users',
  CALENDAR_FILLING = 'calendar-filling',
  CALCULATION_TEMPLATE = 'calculation-template',
  PAYROLL_CALCULATION = 'payroll-calculation',
  PAYSLIP = 'payslip',
  PAYMENT_STATEMENT = 'payment-statement',
}

export const navigation: Navigation = {
  main: [
    { path: MenuItemPath.CALENDAR, name: 'Calendars', icon: CalendarIcon, items: [
      { path: MenuItemPath.COUNTRY_CALENDAR, name: 'Country calendar', icon: GlobeEuropeAfricaIcon },
      { path: MenuItemPath.COMPANY_CALENDAR, name: 'Company calendar', icon: HomeModernIcon },
      { path: MenuItemPath.DEPARTMENT_CALENDAR, name: 'Department calendar', icon: UserGroupIcon },
      { path: MenuItemPath.EMPLOYEE_CALENDAR, name: 'Employee calendar', icon: IdentificationIcon },
    ] },

    { path: MenuItemPath.CATALOG, name: 'Catalogs', icon: ViewColumnsIcon, auth: true, items: [
      { path: MenuItemPath.COUNTRIES, name: 'Countries', icon: ViewColumnsIcon },
      { path: MenuItemPath.COMPANIES, name: 'Companies', icon: ViewColumnsIcon },
      { path: MenuItemPath.DEPARTMENTS, name: 'Departments', icon: ViewColumnsIcon },
      { path: MenuItemPath.EMPLOYEES, name: 'Employees', icon: ViewColumnsIcon },
      { path: MenuItemPath.PEOPLE, name: 'People', icon: ViewColumnsIcon },
      { path: MenuItemPath.USERS, name: 'Users', icon: ViewColumnsIcon },
    ] },

    { path: MenuItemPath.DOCUMENT, name: 'Documents', icon: DocumentTextIcon, auth: true, items: [
      { path: MenuItemPath.CALENDAR_FILLING, name: 'Calendar filling', icon: DocumentTextIcon },
      { path: MenuItemPath.CALCULATION_TEMPLATE, name: 'Calculation template', icon: DocumentIcon },
      { path: MenuItemPath.PAYROLL_CALCULATION, name: 'Payroll calculation', icon: DocumentTextIcon },
    ] },

    { path: MenuItemPath.REPORT, name: 'Reports', icon: ChartBarIcon, auth: true, items: [
      { path: MenuItemPath.PAYSLIP, name: 'Payslip', icon: ChartBarIcon },
      { path: MenuItemPath.PAYMENT_STATEMENT, name: 'Payment statement', icon: ChartBarIcon },
    ] },
  ],

  user: [
    { path: MenuItemPath.PROFILE, name: 'Profile', icon: UserIcon },
    { path: MenuItemPath.SIGN_OUT, name: 'Sign out', icon: ArrowRightStartOnRectangleIcon },
    { path: MenuItemPath.SIGN_IN, name: 'Sign in', icon: ArrowRightEndOnRectangleIcon },
  ],
}

export const getMenuItem = (menuPath: MenuItemPath[]): MenuItem | null => {
  const menuTypes = Object.keys(MenuType).map((key) => MenuType[key as keyof typeof MenuType])

  let menuTypeIndex = 0
  let menuPathIndex = 0
  let menuItems: MenuItem[] = navigation[menuTypes[menuTypeIndex] as keyof Navigation]
  let menuItem: MenuItem | undefined

  while (menuTypeIndex < menuTypes.length && menuPathIndex < menuPath.length) {
    menuItem = menuItems.find((item: MenuItem) => item.path === menuPath[menuPathIndex])

    if (menuItem) {
      menuPathIndex++
      menuItems = menuItem.items || []

    } else {
      menuTypeIndex++
      menuPathIndex = 0
      menuItems = navigation[menuTypes[menuTypeIndex] as keyof Navigation]
    }
  }

  return menuItem || null
}
