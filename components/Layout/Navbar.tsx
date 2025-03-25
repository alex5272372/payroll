import Link from 'next/link'
import Image from 'next/image'

const Navbar = async ({ children, isMobile }: { children: React.ReactNode; isMobile: boolean}) => {
  return (
    <nav className={`${isMobile ? 'flex md:hidden' : 'hidden md:flex'} space-x-4 py-2 px-4 bg-gray-800`}>
      <Link href="/">
        <Image
          alt="Logo"
          src="/logo.png"
          className="h-8 w-8 rounded-md"
          height={32}
          width={32}
        />
      </Link>

      {children}
    </nav>
  )
}

export default Navbar
