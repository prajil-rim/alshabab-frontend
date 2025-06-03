import { TourProps } from "@/types";
import GlobalTourGrid from "./global-tour-grid";
import Leaf from "../icons/leaf";

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
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-12">
            <div className="space-y-6">
                <div className="relative">
                    <h1 className="text-4xl font-semibold text-center">
                        {title}
                    </h1>
                    {showLeaf && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full translate-y-[60%] -rotate-[30deg] origin-top-left z-10 pointer-events-none">
                            <Leaf />
                        </div>
                    )}
                </div>
                <p className="font-manrope text-center max-w-4xl mx-auto overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {description}
                </p>
            </div>
            <GlobalTourGrid tours={tours || []} />
        </section>
    );
};

export default GlobalToursSection;
