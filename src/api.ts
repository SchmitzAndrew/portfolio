import path from "path/posix";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "posts").replace(/\\/g, "/");

export const getSlugs = (): string[] => {
    console.log(`POSTS_PATH: ${POSTS_PATH}`);
    const paths = sync(`${POSTS_PATH}/*.mdx`).map((path) =>
        path.replace(/\\/g, "/")
    );
    console.log(`paths: ${paths}`);

    return paths.map((path) => {
        const parts = path.split("/");
        const fileName = parts[parts.length - 1];
        const [slug, _ext] = fileName.split(".");
        return slug;
    });
};

export const getAllPosts = () => {
    console.log("function called");
    const posts = getSlugs()
        .map((slug) => getPostFromSlug(slug))
        .sort((a, b) => {
            if (a.meta.date > b.meta.date) return 1;
            if (a.meta.date < b.meta.date) return -1;
            return 0;
        })
        .reverse();

    return posts;
};

interface Post {
    content: string;
    meta: PostMeta;
}

export interface PostMeta {
    excerpt: string;
    slug: string;
    title: string;
    tags: string[];
    date: string;
    description: string;
    imageSrc: string;
}

export const getPostFromSlug = (slug: string): Post => {
    const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
    console.log(`postPath: ${postPath}`);
    const source = fs.readFileSync(postPath);
    const { content, data } = matter(source);
    console.log("get post from slug function called");
    return {
        content,
        meta: {
            slug,
            excerpt: data.excerpt ?? "",
            title: data.title ?? slug,
            tags: data.tags ?? [],
            date: (data.date ?? new Date()).toString(),
            description: data.description ?? "",
            imageSrc: data.imageSrc ?? "",
        },
    };
};
