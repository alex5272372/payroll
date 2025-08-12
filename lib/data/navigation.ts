import {
  ArrowPathIcon,
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
  UserPlusIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { HeroIcon } from '@/types'

export enum MenuSection {
  MAIN = 'main',
  USER = 'user',
}

export type MenuItem = {
  path: MenuItemPath;
  section: MenuSection;
  name: string;
  icon: HeroIcon;
  parent?: MenuItemPath;
}

export enum MenuItemPath {
  CALENDAR = '/calendar',
  CATALOG = '/catalog',
  DOCUMENT = '/document',
  REPORT = '/report',
  USER_PROFILE = '/user/profile',
  SIGN_OUT = '/user/sign-out',
  SIGN_IN = '/user/sign-in',
  SIGN_UP = '/user/sign-up',
  RESET_PASSWORD = '/user/reset-password-link',
  COUNTRY_CALENDAR = '/calendar/country-calendar',
  COMPANY_CALENDAR = '/calendar/company-calendar',
  DEPARTMENT_CALENDAR = '/calendar/department-calendar',
  EMPLOYEE_CALENDAR = '/calendar/employee-calendar',
  COUNTRIES = '/catalog/countries',
  COMPANIES = '/catalog/companies',
  DEPARTMENTS = '/catalog/departments',
  EMPLOYEES = '/catalog/employees',
  PEOPLE = '/catalog/people',
  USERS = '/catalog/users',
  CALENDAR_FILLING = '/document/calendar-filling',
  CALCULATION_TEMPLATE = '/document/calculation-template',
  PAYROLL_CALCULATION = '/document/payroll-calculation',
  PAYSLIP = '/report/payslip',
  PAYMENT_STATEMENT = '/report/payment-statement',
}

export const navigation: MenuItem[] = [
  {
    path: MenuItemPath.CALENDAR,
    section: MenuSection.MAIN,
    name: 'Calendars',
    icon: CalendarIcon,
  },
  {
    path: MenuItemPath.COUNTRY_CALENDAR,
    section: MenuSection.MAIN,
    name: 'Country calendar',
    icon: GlobeEuropeAfricaIcon,
    parent: MenuItemPath.CALENDAR,
  },
  {
    path: MenuItemPath.COMPANY_CALENDAR,
    section: MenuSection.MAIN,
    name: 'Company calendar',
    icon: HomeModernIcon,
    parent: MenuItemPath.CALENDAR,
  },
  {
    path: MenuItemPath.DEPARTMENT_CALENDAR,
    section: MenuSection.MAIN,
    name: 'Department calendar',
    icon: UserGroupIcon,
    parent: MenuItemPath.CALENDAR,
  },
  {
    path: MenuItemPath.EMPLOYEE_CALENDAR,
    section: MenuSection.MAIN,
    name: 'Employee calendar',
    icon: IdentificationIcon,
    parent: MenuItemPath.CALENDAR,
  },
  {
    path: MenuItemPath.CATALOG,
    section: MenuSection.MAIN,
    name: 'Catalogs',
    icon: ViewColumnsIcon,
  },
  {
    path: MenuItemPath.COUNTRIES,
    section: MenuSection.MAIN,
    name: 'Countries',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.COMPANIES,
    section: MenuSection.MAIN,
    name: 'Companies',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.DEPARTMENTS,
    section: MenuSection.MAIN,
    name: 'Departments',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.EMPLOYEES,
    section: MenuSection.MAIN,
    name: 'Employees',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.PEOPLE,
    section: MenuSection.MAIN,
    name: 'People',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.USERS,
    section: MenuSection.MAIN,
    name: 'Users',
    icon: ViewColumnsIcon,
    parent: MenuItemPath.CATALOG,
  },
  {
    path: MenuItemPath.DOCUMENT,
    section: MenuSection.MAIN,
    name: 'Documents',
    icon: DocumentTextIcon,
  },
  {
    path: MenuItemPath.CALENDAR_FILLING,
    section: MenuSection.MAIN,
    name: 'Calendar filling',
    icon: DocumentTextIcon,
    parent: MenuItemPath.DOCUMENT,
  },
  {
    path: MenuItemPath.CALCULATION_TEMPLATE,
    section: MenuSection.MAIN,
    name: 'Calculation template',
    icon: DocumentIcon,
    parent: MenuItemPath.DOCUMENT,
  },
  {
    path: MenuItemPath.PAYROLL_CALCULATION,
    section: MenuSection.MAIN,
    name: 'Payroll calculation',
    icon: DocumentTextIcon,
    parent: MenuItemPath.DOCUMENT,
  },
  {
    path: MenuItemPath.REPORT,
    section: MenuSection.MAIN,
    name: 'Reports',
    icon: ChartBarIcon,
  },
  {
    path: MenuItemPath.PAYSLIP,
    section: MenuSection.MAIN,
    name: 'Payslip',
    icon: ChartBarIcon,
    parent: MenuItemPath.REPORT,
  },
  {
    path: MenuItemPath.PAYMENT_STATEMENT,
    section: MenuSection.MAIN,
    name: 'Payment statement',
    icon: ChartBarIcon,
    parent: MenuItemPath.REPORT,
  },
  {
    path: MenuItemPath.USER_PROFILE,
    section: MenuSection.USER,
    name: 'Profile',
    icon: UserIcon,
  },
  {
    path: MenuItemPath.SIGN_OUT,
    section: MenuSection.USER,
    name: 'Sign Out',
    icon: ArrowRightStartOnRectangleIcon,
  },
  {
    path: MenuItemPath.SIGN_IN,
    section: MenuSection.USER,
    name: 'Sign In',
    icon: ArrowRightEndOnRectangleIcon,
  },
  {
    path: MenuItemPath.SIGN_UP,
    section: MenuSection.USER,
    name: 'Sign Up',
    icon: UserPlusIcon,
  },
  {
    path: MenuItemPath.RESET_PASSWORD,
    section: MenuSection.USER,
    name: 'Reset password',
    icon: ArrowPathIcon,
  },
]
