import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'

const Home = async () => {

  return (
    <Layout>
      <main className="flex flex-col items-center">
        <h1 className="mt-32 text-center text-6xl font-bold text-gray-800">Payroll platform</h1>
        <h2 className="mt-4 text-center text-2xl text-gray-600">designed to perform complex periodic calculations</h2>
        <Link
          href="https://github.com/alex5272372/payroll"
          className="mt-8 flex items-center space-x-2"
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
    </Layout>
  )
}

export default Home
