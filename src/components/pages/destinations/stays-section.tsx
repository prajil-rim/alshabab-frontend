import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "../packages/card";
import { LinkProps, MediaProps } from "@/types";

interface StaysSectionProps {
    title: string;
    stays: {
        id: number;
        title: string;
        description: string;
        label: string;
        image: MediaProps;
        cta: LinkProps | null;
    }[];
}

const StaysSection = ({ title, stays }: Readonly<StaysSectionProps>) => {
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-4xl font-semibold">{title}</h3>
                    <div className="flex items-center gap-3">
                        <CarouselPrevious className="relative inset-0 translate-y-0" />
                        <CarouselNext className="relative inset-0 translate-y-0" />
                    </div>
                </div>
                <CarouselContent className="pt-10">
                    {stays?.map((stay, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/4"
                        >
                            <div className="p-1">
                                {/* card */}
                                <Card {...stay} delete_index={index} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default StaysSection;
