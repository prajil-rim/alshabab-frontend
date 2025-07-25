import { StrapiImage } from "@/components/common/strapi-image";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import { getImage } from "@/lib/utils";
import { BlogCardProps } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

const BlogCardSm = ({
    blog_title,
    hero,
    blog_category,
    slug,
}: BlogCardProps) => {
    return (
        <Link
            href={`/blogs/${slug}`}
            className="p-2 border rounded-lg flex gap-2"
        >
            <div className="relative w-[35%] shrink-0">
                <StrapiImage
                    src={getImage({
                        local: process.env.PLACEHOLDER_IMAGE!,
                        prod: hero.cover?.url,
                    })}
                    alt={
                        hero.cover?.alternativeText ||
                        "Alternative Text not provided"
                    }
                    className="rounded-xl size-full"
                    width={400}
                    height={225}
                />
            </div>
            <div className="space-y-2">
                <span className="bg-[#FFFFEF] rounded-full px-2 py-1 font-manrope text-xs block w-fit">
                    {blog_category.category}
                </span>
                <div className="font-semibold max-w-xs overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {blog_title}
                </div>
                <div className="flex justify-between items-center font-manrope">
                    <div className="text-xs">
                        <span className="font-semibold">
                            {format(new Date(hero.date), "MMMM dd, yyyy")}
                        </span>
                        <b className="mx-1">•</b>
                        <span className="font-medium text-[#757272] text-[.65rem]">
                            {hero.read_time} read
                        </span>
                    </div>
                    <ArrowRightUp color="red" className="size-6" />
                </div>
            </div>
        </Link>
    );
};

export default BlogCardSm;
