import HoverSlider from "@/components/common/hover-slider/hover-slider";
import { TabProps } from "@/types";
import Leaf from "../icons/leaf";

interface PopularPDProps {
    title: string;
    description: string;
    tabs: TabProps[];
    showLeaf?: boolean;
    locale: string;
}

const PopularPD = ({
    title,
    description,
    tabs,
    showLeaf = false,
    locale,
}: Readonly<PopularPDProps>) => {
    if (!title || !tabs || !tabs.length) return null;

    return (
        <section className="max-w-6xl mx-auto py-14 space-y-3 lg:space-y-6 px-3 lg:px-2">
            <div className="relative w-fit">
                <h1 className="text-2xl lg:text-4xl font-semibold">{title}</h1>
                {showLeaf && (
                    <div className="absolute left-full -translate-x-[40%] -bottom-2 origin-top-left z-10 pointer-events-none">
                        <Leaf />
                    </div>
                )}
            </div>
            <p className="font-manrope max-w-4xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:8] [-webkit-box-orient:vertical]">
                {description}
            </p>
            <HoverSlider tabs={tabs} locale={locale} />
        </section>
    );
};

export default PopularPD;
