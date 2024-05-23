import { getAllPosts } from "@/lib/api";

import Head from 'next/head';
import Articles from "@/components/Articles";
import SocialLink from "@/components/SocialLink";

export default function Index() {
    const allPosts = getAllPosts();

    return (
        <main>
            <div className='bg-[#04081a] min-h-screen'>
                <div className="pt-4">
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
                <div className="max-w-4xl mx-auto pt-10 pb-6 px-6">
                    <div className="text-slate-300 font-semibold font-Rubik">
                        <p className="md:text-lg">I&apos;m a software developer creating &nbsp;
                            <a href="https://usestylize.com" target="_blank" className="underline text-sky-400">usestylize.com</a>.
                            I'm also studying Data Science at UCSD, but honestly, I'm not a huge fan. I'm terrified of the idea
                            of growing up and becoming a spreadsheet monkey or developing algorithms just to get
                            people to click on ads more.
                        </p>
                        <p className="pt-4 text-lg">
                            Instead, I&apos;m trying to do my own thing. I'm not sure what I want to do with my life yet, but it's definitely not sitting
                            at a desk somewhere for 8 hours a day.
                        </p>

                        <h2 className="font-bold md:text-xl  pt-8 ">Recent Articles:</h2>
                        <Articles posts={allPosts} />

                        <h2 className="font-bold md:text-xl  pt-8 ">More Andrew Schmitz:</h2>
                        <div className="pl-6">
                            <SocialLink link="https://twitter.com/Big_Schmitz" service="x" quote="&quot;Maybe I should stop being real, maybe I should get on Twitter&quot;" text_style="pl-4" />
                            <SocialLink link="https://github.com/SchmitzAndrew" service="github" quote="&quot;All my good code is in private repos ;)&quot;" text_style="pl-4" />
                            <SocialLink link="https://www.linkedin.com/in/andrew-schmitz-/" service="linkedin" quote="&quot;My real jobs&quot;" text_style="pl-4" />
                        </div>

                        <h2 className="font-bold md:text-xl  pt-8 ">Contact Me:</h2>

                        <p className="pt-4 text-lg">
                            Please contact me at &nbsp;
                            <span className="text-sky-400">
                                schmitzandrew03@gmail.com
                            </span>
                            . I'm always happy to meet other silly entrepreneur people :)
                        </p>
                    </div>
                </div>
            </div>


        </main>
    );
}
