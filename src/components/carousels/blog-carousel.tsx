"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import SlideIndicator from "./slide-indicator";
import { BlogCardProps } from "@/types";
import BlogCarouselCard from "../common/blog-section/blog-carousel-card";

const BlogCarousel = ({
    blogs,
}: {
    blogs: (Pick<
        BlogCardProps,
        "id" | "blog_title" | "documentId" | "slug" | "hero"
    > & { blog_summary: string })[];
}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="w-full md:w-1/2">
                    {blogs?.map((blog) => (
                        <CarouselItem key={blog.id}>
                            <BlogCarouselCard blog={blog} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <SlideIndicator count={count} current={current} />
        </div>
    );
};

export default BlogCarousel;
