import { classNames } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const MainMenu = async ({ navigation }: { navigation: { name: string, current: boolean }[] }) => {
  return (
    <div className="flex items-center">
      <Image
        alt="Your Company"
        src="/next.svg"
        className="h-8 w-32 flex-shrink-0"
        height={32}
        width={128}
      />
      <div className="ml-10 hidden md:flex items-baseline space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href=""
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MainMenu
