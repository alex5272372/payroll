import { HeroIcon } from '@/types'

export enum MenuSection {
  MAIN = 'main',
  USER = 'user',
}

export enum MenuItemType {
  PATH = 'path',
  COMPONENT = 'component',
}

export enum MenuItemPath {
  HOME = '/',
  CALENDAR = '/calendar',
  CATALOG = '/catalog',
  DOCUMENT = '/document',
  REPORT = '/report',
  USER_PROFILE = '/user/profile',
  SIGN_OUT = '/user/sign-out',
  SIGN_IN = '/user/sign-in',
  SIGN_UP = '/user/sign-up',
  RESET_PASSWORD = '@/components/user/ResetPasswordLink',
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

export enum TabActionType {
  INIT = 'init',
  CLOSE = 'close',
}
