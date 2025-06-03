import ArrowRightUp from "@/components/icons/arrow-right-up";
import BlogCard from "./blog-card";
import Link from "next/link";
import { BlogCardProps } from "@/types";
import { format } from "date-fns";
import Leaf from "@/components/icons/leaf";

interface BlogSectionProps {
    title: string;
    description: string;
    blogs: (Pick<
        BlogCardProps,
        "id" | "blog_title" | "documentId" | "slug" | "hero"
    > & { blog_summary: string })[];
    showLeaf?: boolean;
}

const BlogSection = ({
    title,
    description,
    blogs,
    showLeaf = false,
}: BlogSectionProps) => {
    if (!title || !blogs || blogs.length === 0) return null;
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <div className="relative">
                <h1 className="text-4xl font-semibold text-center">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] max-w-4xl mx-auto text-center">
                {description}
            </p>
            <div className="space-y-6 pt-5">
                <div className="grid grid-cols-3 gap-6">
                    <Link
                        href={`/blogs/${blogs[0].slug}?id=${blogs[0].documentId}`}
                        className="col-span-2"
                    >
                        <div
                            className="w-full h-96 rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    'url("/images/others/footer_cta_img2.webp")',
                                // `url("${blogs[0].hero.cover.url}")`,
                            }}
                        ></div>
                    </Link>
                    <div className="space-y-6">
                        <h2 className="font-semibold text-2xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                            {blogs[0].blog_title}
                        </h2>
                        <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:8] [-webkit-box-orient:vertical]">
                            {blogs[0].blog_summary}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="font-manrope space-x-2">
                                <b>
                                    {format(
                                        new Date(blogs[0].hero.date),
                                        "MMMM dd, yyyy"
                                    )}
                                </b>
                                <span>•</span>
                                <span className="text-[#757272] text-sm">
                                    {blogs[0].hero.read_time} read
                                </span>
                            </div>
                            <Link
                                href={`/blogs/${blogs[0].slug}?id=${blogs[0].documentId}`}
                            >
                                <ArrowRightUp color="red" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {blogs.slice(1).map((blog) => (
                        <Link
                            href={`/blogs/${blogs[0].slug}?id=${blogs[0].documentId}`}
                            key={blog.documentId}
                        >
                            <BlogCard {...blog} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
