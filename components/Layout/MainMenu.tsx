import { HeroIcon } from '@/types'
import Link from 'next/link'

const MainMenu = async ({ navigation }: { navigation: { id: string, name: string, Icon: HeroIcon }[] }) => {
  return <>
    {navigation.map((item) => (
      <Link
        key={item.id}
        href={`/${item.id}`}
        aria-current={item.id === 'calendar' ? 'page' : undefined}
        className="flex ml-4 px-2 py-1 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <item.Icon className='h-6'></item.Icon>
        <p className='hidden ml-2 md:block'>{item.name}</p>
      </Link>
    ))}
  </>
}

export default MainMenu
