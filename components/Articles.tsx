import Link from "next/link";
import Image from "next/image";

type Metadata = {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    ogImage: string;
};

interface BlogPost {
    metadata: Metadata;
    slug: string;
    content: string;
}


// explicitly add "/posts to href"
export default function Articles({ posts }: { posts: BlogPost[] }) {
    return (
        <>
            <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post.slug} className="flex flex-col items-start justify-between rounded-md shadow-inner">
                        <Link href={`/posts/${post.slug}`}>
                            <div className="relative w-full">
                                <Image
                                    src={post.metadata.coverImage}
                                    alt=""
                                    height="600"
                                    width="800"
                                    className="aspect-[16/9] w-full rounded-3xl object-cover sm:aspect-[2/1] lg:aspect-[3/2] p-3 "
                                />
                                <div className="absolute inset-0 rounded-2xl  ring-inset ring-gray-900" />
                            </div>
                            <div className="max-w-xl p-2">
                                <div className=" flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.metadata.date} className="text-slate-400">
                                        {new Date(post.metadata.date).toLocaleDateString()}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-2 text-lg font-bold leading-6 text-slate-300 ">
                                        <span className="absolute inset-0" />
                                        {post.metadata.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </ul>
        </>
    )

}



