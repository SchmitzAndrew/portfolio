import type { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

import { getPostFromSlug, getSlugs, PostMeta } from "@/src/api";

import YouTube from "../../components/blog/YouTube";
import Figure from "../../components/blog/Figure";
import CustomLink from "../../components/blog/CustomLink";

interface MDXPost {
    source: MDXRemoteSerializeResult<Record<string, unknown>>;
    meta: PostMeta;
}

// add image property
export default function PostPage({ post }: { post: MDXPost }) {
    return (
        <>
            <Head>
                <title>{post.meta.title}</title>
                <meta name="description" content={post.meta.description} />
                <meta property="og:title" content={post.meta.title} key="title" />
                <meta property="og:description" content={post.meta.description} />
                <meta property="og:image" content={post.meta.imageSrc} />
                <meta property="og:type" content="article" />
                <meta property="og:article:published_time" content={post.meta.date} />
                <meta property="og:site_name" content="Profile Pro" />
            </Head>
            
                <h1 title={post.meta.title} />
                <div className="pt-8">
                    <div className="prose prose-slate lg:prose-lg \
                    max-w-4xl mx-auto  \
                    prose-p:font-[450] \
                    prose-headings:text-slate-700 \
                    prose-a:text-sky-600 hover:prose-a:text-sky-400 \
                    prose-ul:font-[450]  \
                    ">
                        <MDXRemote {...post.source} components={{ YouTube, Figure, CustomLink }} />
                    </div>
                </div>
            
        </>
    );
}

//removed autolink headings
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const { content, meta } = getPostFromSlug(slug);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                rehypeHighlight,
            ],
        },
    });

    return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getSlugs().map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};