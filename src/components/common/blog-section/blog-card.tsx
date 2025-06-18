import ArrowRightUp from "@/components/icons/arrow-right-up";
import { BlogCardProps } from "@/types";
import { format } from "date-fns";

const BlogCard = ({
    hero,
    blog_title,
}: Pick<BlogCardProps, "hero" | "blog_title">) => {
    return (
        <div className="space-y-3">
            <div
                className="bg-cover bg-center aspect-video w-full rounded-xl"
                style={{
                    backgroundImage: `url("${hero.cover?.url}")`,
                }}
            ></div>
            <h3 className="font-semibold text-xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {blog_title}
            </h3>
            <div className="flex justify-between items-center">
                <div className="font-manrope space-x-2 text-sm">
                    <b>{format(new Date(hero.date), "MMMM dd, yyyy")}</b>
                    <span>•</span>
                    <span className="text-[#757272] text-xs">
                        {hero.read_time} read
                    </span>
                </div>
                <ArrowRightUp color="red" />
            </div>
        </div>
    );
};

export default BlogCard;
