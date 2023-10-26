import Head from 'next/head'
import Link from 'next/link'

import Articles from '../components/Articles'

import SocialLink from '../components/SocialLink'

import { getAllPosts, PostMeta } from '@/src/api'

export default function Index({posts}: {posts: PostMeta[]}) {
    return (
        <>
            <Head>
                <title>Andrew Schmitz</title>
                <meta name="description" content="Andrew Schmitz's portfolio." />
                <meta property="og:title" content="Andrew Schmitz" />
                <meta property="og:description" content="Andrew Schmitz's portfolio." />
            </Head>
            <div className='bg-[#04081a] min-h-screen'>
                <div className = "pt-4">
                    <div className="flex justify-center">
                        <Link href = "/">
                            <h1 className="title-gradient text-6xl md:text-8xl  text-center px-4 ">
                                Andrew Schmitz
                            </h1>
                        </Link>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto pt-10 pb-6 px-6"></div>
                    <div className=" text-center text-slate-300 font-semibold font-Rubik">
                        <p className="text-lg">Software developer creating &nbsp;
                            <a href="https://usestylize.com" target="_blank" className="underline text-sky-400">usestylize.com</a>.
                            
                        </p> 
                <div className = "flex flex-col items-center pt-6">
                    <SocialLink link="https://twitter.com/Big_Schmitz" service = "twitter" quote = "Twitter" text_style="text-2xl pl-4"/>
                    <SocialLink link= "https://github.com/SchmitzAndrew" service = "github" quote = "GitHub"  text_style = "text-2xl pl-4"/>
                    <SocialLink link="https://www.linkedin.com/in/andrew-schmitz-/" service="linkedin" quote= "LinkedIn"  text_style="text-2xl pl-4"/>
                </div>

                
                <p className = "pt-12 text-xl">
                    Contact me at:  &nbsp;
                    <span className = "text-sky-400"> 
                    schmitzandrew03@gmail.com
                    </span> 
                </p>
            </div>
            </div>
        </>
    );
}

