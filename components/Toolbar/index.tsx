import { MenuItemPath } from '@/lib/data/navigation'
import { AllPermissions, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { ToolbarItem } from '@/types'
import { useSession } from 'next-auth/react'

const Toolbar = ({ items, menuPath }: { items: ToolbarItem[]; menuPath: MenuItemPath; }) => {
  const { data: session } = useSession()

  return <nav className={'flex space-x-2 pt-2 px-2 bg-gray-100'}>
    {items.filter((item: ToolbarItem) =>
      session?.roles?.some((role: UserRole) => (roleMatrix[menuPath][role] as AllPermissions)[item.permission])
    ).map((item: ToolbarItem, idx: number) =>
      <button
        key={idx}
        className={`flex py-1 px-2 rounded-md border bg-gray-300 text-gray-900 hover:bg-gray-400
          cursor-pointer`}
      >
        <item.icon className='h-6' />
        <p className='hidden md:block ml-2'>{item.name}</p>
      </button>
    )}
  </nav>
}

export default Toolbar
