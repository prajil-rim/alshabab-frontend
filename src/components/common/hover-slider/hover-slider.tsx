import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardSlider from "./slider";
import { TabProps } from "@/types";
import HoverSliderCarousel from "@/components/carousels/hover-slider-carousel";
import { dir } from "i18next";

const HoverSlider = ({
    tabs,
    locale,
}: {
    tabs: TabProps[];
    locale: string;
}) => {
    if (!tabs || tabs.length === 0) return null;

    return (
        <Tabs defaultValue={tabs[0].tab_value} dir={dir(locale)}>
            <div className="flex justify-between items-center">
                <TabsList className="space-x-3 font-manrope mb-6 max-w-full overflow-x-scroll scrollbar-none justify-start">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.tab_value}>
                            {tab.tab_heading}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            {tabs.map((tab) => (
                <TabsContent
                    value={tab.tab_heading.toLowerCase().replace(" ", "-")}
                    key={tab.id}
                >
                    <CardSlider slides={tab.slides || []} />
                    <HoverSliderCarousel slides={tab.slides || []} />
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default HoverSlider;
