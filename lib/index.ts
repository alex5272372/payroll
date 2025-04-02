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

export const navigation: Navigation = {
  mainMenu: [
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
  ],
  userMenu: [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'signOut', name: 'Sign out', icon: ArrowRightStartOnRectangleIcon },
    { id: 'signIn', name: 'Sign in', icon: ArrowRightEndOnRectangleIcon },
  ],
}
