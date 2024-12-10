import { getBlogPosts } from "@/lib/utils";

import AnimatedName from "@/components/AnimatedName";

import Articles from "@/components/Articles";


import data from "@/data.json";

export default function Index() {
    const allPosts = getBlogPosts();

    return (
        <>
            <AnimatedName/>
                <div className="max-w-4xl mx-auto pt-10 pb-6 px-6">
                    <div className="text-slate-100 font-semibold ">
                        <p className="text-lg">I&apos;m currently working on&nbsp;
                            <a href={data.currentProject.url} target="_blank" className="underline text-sky-300">{data.currentProject.name}</a>.
                            I'm also studying Data Science at UCSD, but honestly, I'm not a huge fan. 
                            <br />
                            <br />
                            Wasn't really looking forward to becoming a spreadsheet monkey or writing algorithms just to get
                            people to click on ads more, so now I do startup stuff.
                        </p>
                        <h2 className="font-bold md:text-xl pt-12 ">Recent Articles:</h2>
                        <Articles posts={allPosts} />
                        <p className="pt-8 text-lg">
                            Please contact me at &nbsp;
                            <span className="text-sky-300">
                                schmitzandrew03@gmail.com
                            </span>
                            .
                        </p>
                    </div>
                </div>
        </>
    );
}
