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
        <section className="max-w-6xl mx-auto pt-20 space-y-6">
            <div className="relative w-fit">
                <h1 className="text-4xl font-semibold">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-full -translate-x-[40%] bottom-0 origin-top-left z-10 pointer-events-none">
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
