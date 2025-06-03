import type { HeroSlideProps } from "@/types";
import HeroSlide from "./hero-slide";

export function HeroSection({
    heroSlides,
}: {
    heroSlides: Readonly<HeroSlideProps[]>;
}) {
    return (
        <section className="hero">
            {heroSlides.map((slide) => (
                <HeroSlide key={slide.id} {...slide} />
            ))}
        </section>
    );
}
