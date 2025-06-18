"use client";

import Markdown from "react-markdown";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "../common/testimonials/testimonial-card";
import { TestimonialProps } from "@/types";
import SlideIndicator from "./slide-indicator";
import { useEffect, useState } from "react";

interface TestimonialCarouselProps {
    description: string;
    testimonials: TestimonialProps[];
}

const TestimonialCarousel = ({
    description,
    testimonials,
}: Readonly<TestimonialCarouselProps>) => {
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
        <Carousel
            className="w-full space-y-6"
            opts={{
                slidesToScroll: 1,
                align: "start",
                containScroll: "trimSnaps",
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
            setApi={setApi}
        >
            <div className="flex justify-between items-end">
                <div className="font-manrope max-w-lg">
                    <Markdown>{description}</Markdown>
                </div>
                <div className="items-center gap-2 hidden lg:flex">
                    <CarouselPrevious className="relative inset-0" />
                    <CarouselNext className="relative inset-0" />
                </div>
            </div>
            <CarouselContent
                className="-ml-1 w-[90%] lg:w-full"
                contentStyle="py-5"
            >
                {testimonials?.map((testimonial) => (
                    <CarouselItem
                        key={testimonial.id}
                        className="min-[678px]:max-[914px]:basis-1/2 min-[915px]:max-lg:basis-1/3 lg:basis-1/4"
                    >
                        <TestimonialCard {...testimonial} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <SlideIndicator count={count} current={current} />
        </Carousel>
    );
};

export default TestimonialCarousel;
