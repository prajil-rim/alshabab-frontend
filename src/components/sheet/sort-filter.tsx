import { type ReactNode } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { X } from "lucide-react";
import SortFilterContent from "./sort-filter-content";

const SortFilter = ({
    children,
    action,
    packageCategories,
}: {
    children: ReactNode;
    action: "sort" | "filter";
    packageCategories: {
        category: string;
        slug: string;
    }[];
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="py-6 px-4 min-w-[95%] bg-[#F5F5F5]">
                <SheetTitle className="sr-only">Filter</SheetTitle>
                <SheetClose className="ms-auto">
                    <X size={30} />
                </SheetClose>
                <SortFilterContent
                    action={action}
                    packageCategories={packageCategories}
                />
            </SheetContent>
        </Sheet>
    );
};

export default SortFilter;
