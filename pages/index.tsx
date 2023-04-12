import Image from 'next/image'

export default function Home() {
    return (
        <div className='bg-black min-h-screen'>
            <div className="flex justify-center">
                <h1 className="title-gradient text-6xl md:text-8xl font-bold text-center">
                    Andrew Schmitz
                </h1>
            </div>
            <div className="max-w-7xl mx-auto">
                <p className="text-white">I&apos;m a software developer.</p>
            </div>
        </div>
    );
}


