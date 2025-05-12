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
import { HeroIcon, MenuItemIcon, Navigation } from '@/types'

export enum MenuItemType {
  CALENDAR = 'calendar',
  CATALOG = 'catalog',
  DOCUMENT = 'document',
  REPORT = 'report',
  PROFILE = 'profile',
  SIGN_OUT = 'signOut',
  SIGN_IN = 'signIn',
  COUNTRY_CALENDAR = 'countryCalendar',
  COMPANY_CALENDAR = 'companyCalendar',
  DEPARTMENT_CALENDAR = 'departmentCalendar',
  EMPLOYEE_CALENDAR = 'employeeCalendar',
  COUNTRIES = 'countries',
  COMPANIES = 'companies',
  DEPARTMENTS = 'departments',
  EMPLOYEES = 'employees',
  PEOPLE = 'people',
  USERS = 'users',
  CALENDAR_FILLING = 'calendarFilling',
  CALCULATION_TEMPLATE = 'calculationTemplate',
  PAYROLL_CALCULATION = 'payrollCalculation',
  PAYSLIP = 'payslip',
  PAYMENT_STATEMENT = 'paymentStatement',
}

export const menuItemIcons: Record<MenuItemIcon, HeroIcon> = {
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
}

export const navigation: Navigation = {
  mainMenu: [
    { id: MenuItemType.CALENDAR, name: 'Calendars', icon: 'CalendarIcon', items: [
      { id: MenuItemType.COUNTRY_CALENDAR, name: 'Country calendar', icon: 'GlobeEuropeAfricaIcon' },
      { id: MenuItemType.COMPANY_CALENDAR, name: 'Company calendar', icon: 'HomeModernIcon' },
      { id: MenuItemType.DEPARTMENT_CALENDAR, name: 'Department calendar', icon: 'UserGroupIcon' },
      { id: MenuItemType.EMPLOYEE_CALENDAR, name: 'Employee calendar', icon: 'IdentificationIcon' },
    ] },

    { id: MenuItemType.CATALOG, name: 'Catalogs', icon: 'ViewColumnsIcon', auth: true, items: [
      { id: MenuItemType.COUNTRIES, name: 'Countries', icon: 'ViewColumnsIcon' },
      { id: MenuItemType.COMPANIES, name: 'Companies', icon: 'ViewColumnsIcon' },
      { id: MenuItemType.DEPARTMENTS, name: 'Departments', icon: 'ViewColumnsIcon' },
      { id: MenuItemType.EMPLOYEES, name: 'Employees', icon: 'ViewColumnsIcon' },
      { id: MenuItemType.PEOPLE, name: 'People', icon: 'ViewColumnsIcon' },
      { id: MenuItemType.USERS, name: 'Users', icon: 'ViewColumnsIcon' },
    ] },

    { id: MenuItemType.DOCUMENT, name: 'Documents', icon: 'DocumentTextIcon', auth: true, items: [
      { id: MenuItemType.CALENDAR_FILLING, name: 'Calendar filling', icon: 'DocumentTextIcon' },
      { id: MenuItemType.CALCULATION_TEMPLATE, name: 'Calculation template', icon: 'DocumentIcon' },
      { id: MenuItemType.PAYROLL_CALCULATION, name: 'Payroll calculation', icon: 'DocumentTextIcon' },
    ] },

    { id: MenuItemType.REPORT, name: 'Reports', icon: 'ChartBarIcon', auth: true, items: [
      { id: MenuItemType.PAYSLIP, name: 'Payslip', icon: 'ChartBarIcon' },
      { id: MenuItemType.PAYMENT_STATEMENT, name: 'Payment statement', icon: 'ChartBarIcon' },
    ] },
  ],
  userMenu: [
    { id: MenuItemType.PROFILE, name: 'Profile', icon: 'UserIcon' },
    { id: MenuItemType.SIGN_OUT, name: 'Sign out', icon: 'ArrowRightStartOnRectangleIcon' },
    { id: MenuItemType.SIGN_IN, name: 'Sign in', icon: 'ArrowRightEndOnRectangleIcon' },
  ],
}
