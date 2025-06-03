"use client";

import Markdown from "react-markdown";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "../common/testimonials/testimonial-card";
import { TestimonialProps } from "@/types";

interface TestimonialCarouselProps {
    description: string;
    testimonials: TestimonialProps[];
}

const TestimonialCarousel = ({
    description,
    testimonials,
}: Readonly<TestimonialCarouselProps>) => {
    return (
        <Carousel
            className="w-full space-y-6"
            opts={{
                slidesToScroll: 4,
                align: "start",
                containScroll: "trimSnaps",
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <div className="flex justify-between items-end">
                <div className="font-manrope max-w-lg">
                    <Markdown>{description}</Markdown>
                </div>
                <div className="flex items-center gap-2">
                    <CarouselPrevious className="relative inset-0" />
                    <CarouselNext className="relative inset-0" />
                </div>
            </div>
            <CarouselContent className="-ml-1" contentStyle="py-5">
                {testimonials?.map((testimonial) => (
                    <CarouselItem
                        key={testimonial.id}
                        className="md:basis-1/2 lg:basis-1/4"
                    >
                        <TestimonialCard {...testimonial} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default TestimonialCarousel;
