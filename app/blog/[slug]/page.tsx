
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/utils";

import Header from "@/components/Header";

import Image from "next/image";

import { CustomMDX } from "@/components/CustomMDX";

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
      <article className="px-6 sm:px-0 pb-6">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter leading-tight md:leading-none pt-4 pb-6  text-center  text-gray-50">
          {post.metadata.title}
        </h1>

        <div className=" mb-6 max-w-2xl mx-auto">
          <Image
            src={post.metadata.coverImage}
            alt={`Cover Image for ${post.metadata.title}`}
            className="shadow-sm w-full rounded-xl"
            width={1300}
            height={630}
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-lg text-gray-50">
            {formatDate(post.metadata.date)}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="prose prose-invert md:prose-lg lg:prose-xl prose-a:underline hover:prose-a:text-sky-500">
            <CustomMDX source={post.content} />
          </div>
        </div>
      </article>
    </main>
  );
}


