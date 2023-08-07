import Image from 'next/image'
import Head from 'next/head'

import Articles from '../components/Articles'

import SocialLink from '../components/SocialLink'

import { getAllPosts, PostMeta } from '@/src/api'

export default function Index({posts}: {posts: PostMeta[]}) {
    return (
        <div>
            <Head>
                <title>Andrew Schmitz</title>
                <meta name="description" content="Andrew Schmitz's portfolio." />
                <meta property="og:title" content="Andrew Schmitz" />
                <meta property="og:description" content="Andrew Schmitz's portfolio." />
                
            </Head>
            <div className='bg-[#04081a] min-h-screen'>
                <div className = "pt-4">
                    <div className="flex justify-center pr-14">
                        <h1 className="title-gradient text-6xl md:text-8xl  text-center px-4 ">
                            Andrew
                        </h1>
                    </div>
                    <div className="flex justify-center pl-14">
                        <h1 className="title-gradient text-6xl md:text-8xl  text-center px-4 ">
                            Schmitz
                        </h1>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto pt-10 px-6">
                    <div className="text-slate-300 font-semibold font-Rubik">
                        <p className="md:text-lg">I&apos;m a software developer creating &nbsp;
                            <a href="https://profilepro.ai" target="_blank" className="underline ">profilepro.ai</a>.
                            I'm also studying Data Science at UCSD, but honestly, I hate it. I'm terrified of the idea
                            of growing up and becoming a spreadsheet monkey or developing algorithims just to get
                            people to click on ads more.
                        </p>
                        <p className="pt-4 text-lg">
                            Instead, I&apos;m working towards becoming some sort of entrepreneur. The process of creating a product,
                            getting told said product sucks, and iterating on it has a much better chance of getting me out of bed
                            in the morning.
                        </p>
                    
                    <h2 className = "font-bold md:text-xl  pt-8 ">Recent Articles:</h2>
                    <Articles posts = {posts}/ >

                    <h2 className = "font-bold md:text-xl  pt-8 ">More Andrew Schmitz:</h2>
                    <div className = "pl-6">
                        <SocialLink link="https://twitter.com/Big_Schmitz" service = "twitter" quote = "Maybe I should stop being real, maybe I should get on Twitter"/>
                        <SocialLink link= "https://github.com/SchmitzAndrew" service = "github" quote = "All my good code is in private repos ;)" />
                        <SocialLink link="https://www.linkedin.com/in/andrew-schmitz-/" service="linkedin" quote= "My real jobs" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const posts = getAllPosts()
        .map((post) => post.meta);
    console.log(posts)
    return { props: { posts } };
}
