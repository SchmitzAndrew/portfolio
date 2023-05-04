import Image from 'next/image'
import Head from 'next/head'

import SocialLink from '../components/SocialLink'

export default function Index() {
    return (
        <div>
            <Head>
                <title>Andrew Schmitz</title>
                <meta name="description" content="Andrew Schmitz's portfolio." />
                <meta property="og:title" content="Andrew Schmitz" />
                <meta property="og:description" content="Andrew Schmitz's portfolio." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className='bg-[#04081a] min-h-screen'>
                <div className="flex justify-center pr-14">
                    <h1 className="title-gradient text-6xl md:text-8xl font-bold text-center italic px-4 ">
                        Andrew
                    </h1>
                </div>
                <div className="flex justify-center pl-14">
                    <h1 className="title-gradient text-6xl md:text-8xl font-bold text-center italic px-4 ">
                        Schmitz
                    </h1>
                </div>
                <div className="max-w-4xl mx-auto pt-10 px-6">
                    <div className="text-slate-300 font-semibold font-Rubik">
                        <p className="md:text-lg">I&apos;m a software developer creating &nbsp;
                            <a href="https://profilepro.ai" target="_blank" className="underline ">promptgallery.app</a>.
                            I'm also studying Data Science at UCSD, but honestly, I hate it. I'm terrified of the idea
                            of growing up and becoming a spreadsheet monkey or developing algorithims just to get
                            people to click on ads more.
                        </p>
                        <p className="pt-4 mg:text-lg">
                            Instead, I&apos;m working towards becoming some sort of entrepreneur. The process of creating a product,
                            getting told said product sucks, and iterating on it has a much better chance of getting me out of bed
                            in the morning.
                        </p>
                    
                    <h2 className = "font-bold md:text-xl  pt-8  ">More Andrew Schmitz:</h2>
                        <SocialLink link="https://twitter.com/Big_Schmitz" service = "twitter" quote = "Maybe I should stop being real, maybe I should get on Twitter"/>
                        <SocialLink link= "https://github.com/SchmitzAndrew" service = "github" quote = "All my good code is in private repos ;)" />
                        <SocialLink link= "https://www.linkedin.com/in/andrew-schmitz-/" service = "linkedin" quote = "My real jobs" />
                    </div>
                </div>
            </div>
        </div>
    );
}


