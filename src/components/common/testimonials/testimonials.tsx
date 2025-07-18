import TestimonialCarousel from "@/components/carousels/testimonial-carousel";
import Leaf from "@/components/icons/leaf";
import { TestimonialProps } from "@/types";

interface TestimonialsProps {
    title: string;
    description: string;
    testimonials: TestimonialProps[];
    showLeaf?: boolean;
}

const Testimonials = ({
    title,
    description,
    testimonials,
    showLeaf = false,
}: Readonly<TestimonialsProps>) => {
    if (!testimonials || testimonials.length === 0 || !title) return null;

    return (
        <section className="max-w-7xl mx-auto space-y-3 lg:space-y-6 px-3 lg:px-6 2xl:px-0">
            <div className="relative w-fit">
                <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-full -translate-x-[40%] bottom-0 origin-top-left z-10 pointer-events-none hidden md:block">
                        <Leaf />
                    </div>
                )}
            </div>
            <TestimonialCarousel
                description={description}
                testimonials={testimonials}
            />
        </section>
    );
};

export default Testimonials;
