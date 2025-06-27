import BlogCard from "./blog-card";
import Link from "next/link";
import { BlogCardProps } from "@/types";
import Leaf from "@/components/icons/leaf";
import BlogCarousel from "@/components/carousels/blog-carousel";
import BlogCarouselCard from "./blog-carousel-card";

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
        <section className="max-w-7xl mx-auto py-10 space-y-6 px-3 lg:px-6 2xl:px-0">
            <div className="relative">
                <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                    {title}
                </h1>
                {showLeaf && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical] max-w-4xl mx-auto text-center">
                {description}
            </p>
            <div className="space-y-6 pt-5 hidden lg:block">
                <BlogCarouselCard blog={blogs[0]} />
                <div className="grid grid-cols-3 gap-6">
                    {blogs.slice(1).map((blog) => (
                        <Link
                            href={`/blogs/${blogs[0].slug}`}
                            key={blog.documentId}
                        >
                            <BlogCard {...blog} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-6 pt-5 lg:hidden">
                <BlogCarousel blogs={blogs} />
            </div>
        </section>
    );
};

export default BlogSection;
