const navigation = [
    {
        name: 'X',
        href: 'https://x.com/big_schmitz',
        src: "/images/icons/x.svg"
    },
    {
        name: 'GitHub',
        href: 'https://github.com/SchmitzAndrew',
        src: "/images/icons/github.svg"
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCzWFs1o9alZqgSHKC6fkdcQ',
        src: "/images/icons/youtube.svg"
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/andrew-schmitz-/',
        src: "/images/icons/linkedin.svg"
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#04081a]">
            <div className="mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{item.name}</span>
                            <img src={item.src} className="h-6 w-6 fill-white" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-sm font-medium text-gray-300">
                        Thanks for stopping by :)
                    </p>
                </div>
            </div>
        </footer>
    );
}


