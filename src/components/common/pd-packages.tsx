import HoverSlider from "@/components/common/hover-slider/hover-slider";
import { TabProps } from "@/types";
import Leaf from "../icons/leaf";

interface PopularPDProps {
    title: string;
    description: string;
    tabs: TabProps[];
    showLeaf?: boolean;
}

const PopularPD = ({
    title,
    description,
    tabs,
    showLeaf = false,
}: Readonly<PopularPDProps>) => {
    if (!title || !tabs || !tabs.length) return null;
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <div className="relative w-fit">
                <h1 className="text-4xl font-semibold">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-full -translate-x-[40%] bottom-0 origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope max-w-4xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <HoverSlider tabs={tabs} />
        </section>
    );
};

export default PopularPD;
