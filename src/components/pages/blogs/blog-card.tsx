import { StrapiImage } from "@/components/common/strapi-image";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import { BlogCardProps } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({
    blog_title,
    hero,
    documentId,
    blog_category,
    slug,
}: BlogCardProps) => {
    return (
        <Link href={`/blogs/${slug}?id=${documentId}`} className="space-y-3">
            <div className="relative">
                <StrapiImage
                    // src={hero.cover.url}
                    src="http://localhost:3000/images/blog/blog_1.webp"
                    alt={hero.cover.alternativeText || ""}
                    className="rounded-xl aspect-video"
                    width={400}
                    height={225}
                />
                <span className="bg-white rounded-full px-3 py-1 absolute top-0 left-0 text-xs font-manrope m-3 font-bold">
                    {blog_category?.category}
                </span>
            </div>
            <div className="text-lg font-semibold max-w-xs overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {blog_title}
            </div>
            <div className="flex justify-between items-center font-manrope">
                <div className="text-sm">
                    <span className="font-semibold">
                        {format(new Date(hero.date), "MMMM dd, yyyy")}
                    </span>
                    <b className="mx-2">•</b>
                    <span className="font-medium text-[#757272] text-xs">
                        {hero.read_time} read
                    </span>
                </div>
                <ArrowRightUp color="red" className="size-6" />
            </div>
        </Link>
    );
};

export default BlogCard;
