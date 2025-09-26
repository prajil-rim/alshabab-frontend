import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import FlightFilter from "../pages/package-filter/flight-filter";
import BudgetFilter from "../pages/package-filter/budget-filter";
import DurationFilter from "../pages/package-filter/duration-filter";
import RecommendedForFilter from "../pages/package-filter/recommended-for-filter";
import Reset from "./reset";
import { SheetClose } from "../ui/sheet";
import SortBy from "./sort-by";

const SortFilterContent = ({
    action,
    packageCategories,
}: {
    action: "sort" | "filter";
    packageCategories: { category: string; slug: string }[];
}) => {
    return (
        <Tabs defaultValue={action}>
            <TabsList className="font-manrope">
                <TabsTrigger
                    value="sort"
                    className="bg-[#F0F0F0] rounded-tl-lg py-3.5 w-36 h-12 border-b-2 border-b-transparent data-[state=active]:border-secondary data-[state=active]:bg-white"
                >
                    Sort
                </TabsTrigger>
                <TabsTrigger
                    value="filter"
                    className="bg-[#F0F0F0] rounded-tr-lg py-3.5 w-36 h-12 border-b-2 border-b-transparent data-[state=active]:border-secondary data-[state=active]:bg-white"
                >
                    Filter
                </TabsTrigger>
            </TabsList>
            <TabsContent value="sort" className="font-manrope px-1.5">
                <SortBy />
                <Separator className="bg-black/10" />
                <div className="flex justify-end mt-5">
                    <SheetClose asChild>
                        <Button variant={"secondary"}>Done</Button>
                    </SheetClose>
                </div>
            </TabsContent>
            <TabsContent value="filter" className="font-manrope px-1.5">
                <Reset />
                <FlightFilter />
                <Separator className="bg-black/10 my-3" />
                <BudgetFilter hideEraser />
                <Separator className="bg-black/10 my-3" />
                <DurationFilter hideEraser />
                <Separator className="bg-black/10 my-3" />
                <RecommendedForFilter
                    hideEraser
                    packageCategories={packageCategories}
                />
                <Separator className="bg-black/10" />
                <div className="flex justify-end mt-5">
                    <SheetClose asChild>
                        <Button variant={"secondary"}>Done</Button>
                    </SheetClose>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default SortFilterContent;
