import { TourProps } from "@/types";
import GlobalTourGrid from "./global-tours/global-tour-grid";
import Leaf from "../icons/leaf";
import GlobalTourCarousel from "../carousels/global-tour-carousel";

interface GlobalToursProps {
    title: string;
    description: string;
    tours: TourProps[];
    showLeaf?: boolean;
}

const GlobalToursSection = ({
    title,
    description,
    tours,
    showLeaf = false,
}: Readonly<GlobalToursProps>) => {
    if (!title || !tours || tours.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto py-10 space-y-6 lg:space-y-12 px-3 lg:px-6 2xl:px-0">
            <div className="space-y-6">
                <div className="relative">
                    <h1 className="text-2xl lg:text-4xl font-semibold text-center">
                        {title}
                    </h1>
                    {showLeaf && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                            <Leaf />
                        </div>
                    )}
                </div>
                <p className="font-manrope text-center max-w-4xl mx-auto">
                    {description}
                </p>
            </div>

            <GlobalTourGrid tours={tours || []} />
            <GlobalTourCarousel tours={tours || []} />
        </section>
    );
};

export default GlobalToursSection;
