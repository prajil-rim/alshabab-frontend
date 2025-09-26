"use client";

import { Button } from "@/components/ui/button";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { ArrowUpDown } from "lucide-react";

const PackageSort = () => {
    const { setPackageFilter } = usePackageFilterContext();
    return (
        <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600">
            <span>Sort by</span>

            <Button
                variant="outline"
                size="sm"
                className="text-[#333333] bg-[#F5F5F5] rounded-full h-fit py-1 px-2 text-xs font-semibold border shadow-none hover:text-primary cursor-pointer"
                onClick={() =>
                    setPackageFilter((prev) => ({
                        ...prev,
                        sortBy: {
                            value: "duration",
                            asc: true,
                        },
                    }))
                }
            >
                Duration
                <ArrowUpDown className="size-3" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="text-[#333333] bg-[#F5F5F5] rounded-full h-fit py-1 px-2 text-xs font-semibold border shadow-none hover:text-primary cursor-pointer"
                onClick={() =>
                    setPackageFilter((prev) => ({
                        ...prev,
                        sortBy: {
                            value: "price",
                            asc: true,
                        },
                    }))
                }
            >
                Price
                <ArrowUpDown className="size-3" />
            </Button>
        </div>
    );
};

export default PackageSort;
