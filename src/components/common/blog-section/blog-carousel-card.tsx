import ArrowRightUp from "@/components/icons/arrow-right-up";
import { BlogCardProps } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

const BlogCarouselCard = ({
    blog,
}: {
    blog: Pick<
        BlogCardProps,
        "id" | "blog_title" | "documentId" | "slug" | "hero"
    > & { blog_summary: string };
}) => {
    return (
        <div className="grid lg:grid-cols-3 gap-3 lg:gap-6">
            <Link
                href={`/blogs/${blog.slug}?id=${blog.documentId}`}
                className="col-span-2"
            >
                <div
                    className="w-full aspect-video lg:h-96 rounded-xl bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url("/images/others/footer_cta_img2.webp")',
                        // `url("${blogs[0].hero.cover.url}")`,
                    }}
                ></div>
            </Link>
            <div className="space-y-3 lg:space-y-6">
                <h2 className="font-semibold text-xl lg:text-2xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {blog.blog_title}
                </h2>
                <p className="font-manrope overflow-hidden text-ellipsis hidden lg:[display:-webkit-box] [-webkit-line-clamp:8] [-webkit-box-orient:vertical]">
                    {blog.blog_summary}
                </p>
                <div className="flex justify-between items-center">
                    <div className="font-manrope space-x-2 text-sm lg:text-base">
                        <b>
                            {format(new Date(blog.hero.date), "MMMM dd, yyyy")}
                        </b>
                        <span>•</span>
                        <span className="text-[#757272] text-sm">
                            {blog.hero.read_time} read
                        </span>
                    </div>
                    <Link href={`/blogs/${blog.slug}`}>
                        <ArrowRightUp color="red" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCarouselCard;
