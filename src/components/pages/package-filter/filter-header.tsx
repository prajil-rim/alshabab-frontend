"use client";

import { Button } from "@/components/ui/button";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { Eraser } from "lucide-react";

const FilterHeader = ({ destination_label }: { destination_label: string }) => {
    const { setDefault } = usePackageFilterContext();
    return (
        <div className="flex justify-between items-center">
            <h6 className="uppercase font-bold">
                TRIP FOR {destination_label}
                {/* <span className="text-primary">&#040;10&#041;</span> */}
            </h6>
            <Button
                variant={"outline"}
                className="rounded-full text-[0.65rem] font-semibold has-[>svg]:px-1.5 py-1 h-fit gap-1 text-primary hover:text-primary cursor-pointer"
                onClick={setDefault}
            >
                <Eraser className="size-3" />
                <span>Reset</span>
            </Button>
        </div>
    );
};

export default FilterHeader;
