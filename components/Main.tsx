import Image from 'next/image'
import Link from 'next/link'

const Main = async () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="https://github.com/alex5272372/payroll"
        className="flex items-center space-x-2"
      >
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={24}
          height={24}
          priority
        />
        <p className="font-light">Source</p>
      </Link>
    </main>
  )
}

export default Main
