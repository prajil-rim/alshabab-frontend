import { ArrowUpDown, Filter } from "lucide-react";
import SortFilter from "@/components/sheet/sort-filter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { PackageBannerProps, PackageCardProps } from "@/types";
import PackageGrid from "./package-grid";
import PackageSort from "./package-sort";

const TravelPackagesListing = ({
    packages,
    packageCategories,
    parentPackageData,
}: {
    packages: PackageCardProps[];
    packageCategories: {
        category: string;
        slug: string;
    }[];
    parentPackageData: {
        destination: string;
        package_banner: PackageBannerProps;
    };
}) => {
    return (
        <div className="max-w-6xl mx-auto lg:p-6 pt-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                    <span className="text-primary text-sm">
                        {parentPackageData.destination} Travel Packages{" "}
                        <span>&#040;{packages.length}&#041;</span>
                    </span>
                </h1>

                {/* For small screen */}
                <div className="flex items-center lg:hidden">
                    <SortFilter
                        action="sort"
                        packageCategories={packageCategories}
                    >
                        <button className="bg-[#F5F5F5] border border-[#DBD6C7]/30 rounded-l-full flex items-center gap-1 px-3 text-sm py-1">
                            <ArrowUpDown className="size-3" />
                            Sort
                        </button>
                    </SortFilter>
                    <SortFilter
                        action="filter"
                        packageCategories={packageCategories}
                    >
                        <button className="bg-[#F5F5F5] border border-[#DBD6C7]/30 rounded-r-full flex items-center gap-1 px-3 text-sm py-1">
                            <Filter className="size-3" />
                            Filter
                        </button>
                    </SortFilter>
                </div>

                {/* For large screen */}
                <PackageSort />
            </div>

            <div className="pb-5 space-y-5 lg:hidden">
                <RadioGroup defaultValue="with-flight" className="flex">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="with-flight" id="r1" />
                        <Label htmlFor="r1">Rest More</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="without-flight" id="r2" />
                        <Label htmlFor="r2">Travel More</Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Package Grid */}
            <PackageGrid
                packages={packages}
                parentPackageData={parentPackageData}
            />
        </div>
    );
};

export default TravelPackagesListing;
