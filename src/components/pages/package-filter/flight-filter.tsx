"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { Plane } from "lucide-react";

const FlightFilter = () => {
    const { packageFilter, setPackageFilter } = usePackageFilterContext();

    return (
        <div className="pt-7 pb-5 space-y-5">
            <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                <Plane className="size-4" />
                <span>Flights</span>
            </div>
            <RadioGroup
                value={
                    packageFilter.withFlights === null
                        ? "all"
                        : packageFilter.withFlights
                        ? "with-flight"
                        : "without-flight"
                }
                onValueChange={(value) =>
                    setPackageFilter((prev) => ({
                        ...prev,
                        withFlights:
                            value === "all"
                                ? null
                                : value === "with-flight"
                                ? true
                                : false,
                    }))
                }
                className="flex"
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="all" id="r0" />
                    <Label htmlFor="r0">All</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="with-flight" id="r1" />
                    <Label htmlFor="r1">With Flight</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="without-flight" id="r2" />
                    <Label htmlFor="r2">Without Flight</Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default FlightFilter;
