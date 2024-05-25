import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts} from "@/lib/utils";

import { CustomMDX } from "@/components/CustomMDX";

import Header from "@/components/Header";

import { PostHeader } from "@/components/PostHeader";



export default async function Post({ params }: Params) {
  const post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Header />
      <article className="">
        <PostHeader
          title={post.metadata.title}
          coverImage={post.metadata.ogImage}
          date={post.metadata.date}
        />
        <div className="max-w-2xl mx-auto">
          <CustomMDX source={post.content} />
        </div>
      </article>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.metadata.title} | An Article From Andrew Schmitz's Blog`;

  return {
    title,
    openGraph: {
      title,
      images: [post.metadata.ogImage],
    },
    description: post.metadata.excerpt,
    twitter: {
      title,
      description: post.metadata.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
