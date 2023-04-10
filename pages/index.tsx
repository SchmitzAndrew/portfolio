import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <h1 className="title-gradient text-8xl font-bold" >
                Andrew Schmitz
            </h1>
        </main>
    )
}
