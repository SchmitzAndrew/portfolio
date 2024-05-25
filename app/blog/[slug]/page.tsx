import { Metadata } from "next";
import { notFound } from "next/navigation";
import {getBlogPosts} from "@/lib/utils";

import { CustomMDX } from "@/components/CustomMDX";

import Header from "@/components/Header";

import { PostHeader } from "@/components/PostHeader";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.filter(post => post !== null).map((post) => ({
      slug: post?.slug,
  }));
}

export function generateMetadata({ params }: any) {
  let post = getBlogPosts().find((post) => post?.slug === params.slug);
  if (!post) {
      return;
  }

  let {
      title,
      date: date,
      excerpt: description,
      ogImage: image,
  } = post.metadata;
  let ogImage = image
      ? image
      : `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return {
      title,
      description,
      openGraph: {
          title,
          description,
          type: "article",
          publishedTime: date,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
          images: [
              {
                  url: ogImage,
              },
          ],
      },
      twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
      },
  };
}


type Params = {
  params: {
    slug: string;
  };
};


export default async function Post({ params }: Params) {
  const post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.metadata.title,
                        datePublished: post.metadata.date,
                        dateModified: post.metadata.date,
                        description: post.metadata.excerpt,
                        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: "Andrew Schmitz",
                        },
                    }),
                }}
            />
      <Header />
      <article className="">
        <PostHeader
          title={post.metadata.title}
          coverImage={post.metadata.coverImage}
          date={post.metadata.date}
        />
        <div className="max-w-2xl mx-auto">
          <CustomMDX source={post.content} />
        </div>
      </article>
    </main>
  );
}


