import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

const Main = async () => {
  const session = await auth()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
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
      <pre>{JSON.stringify(session)}</pre>
    </main>
  )
}

export default Main
