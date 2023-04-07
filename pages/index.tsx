import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
        <h1 className= "underline text-white">
            Hello World! :)
        </h1>
    </main>
  )
}
