import Image from 'next/image'
import Link from 'next/link'

const MainMenu = async ({ navigation }: { navigation: { id: string, name: string }[] }) => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image
          alt="Company"
          src="/next.svg"
          className="h-8 w-32 flex-shrink-0"
          height={32}
          width={128}
        />
      </Link>
      <div className="ml-10 hidden md:flex items-baseline space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={`/${item.id}`}
            aria-current={item.id === 'calendar' ? 'page' : undefined}
            className="px-3 py-1 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MainMenu
