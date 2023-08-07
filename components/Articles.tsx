import Link from "next/link";
import Image from "next/image";
import  {getAllPosts} from "@/src/api";
import type { GetStaticProps } from "next";
import type { PostMeta } from "@/src/api";


// explicitly add "/posts to href"
export default function Articles({posts}: {posts: PostMeta[]}) {
    
    return (
        <>
            <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post.slug} className="flex flex-col items-start justify-between bg-gray-50 rounded-md hover:shadow-md">
                        <Link href={`/posts/${post.slug}`}>
                            <div className="relative w-full">
                                <Image
                                    src={post.imageSrc}
                                    alt=""
                                    height="400"
                                    width="300"
                                    className="aspect-[16/9] w-full rounded-3xl object-cover sm:aspect-[2/1] lg:aspect-[3/2] p-4 "
                                />
                                <div className="absolute inset-0 rounded-2xl  ring-inset ring-gray-900" />
                            </div>
                            <div className="max-w-xl p-2">
                                <div className="mt-4 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-gray-700">
                                        {new Date(post.date).toLocaleDateString()}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-2 text-lg font-bold leading-6 text-gray-900 ">
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-700">{post.excerpt}</p>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </ul>
        </>
    )

}



