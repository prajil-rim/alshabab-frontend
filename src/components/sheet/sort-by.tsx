"use client";

import { Clock, HandCoins } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { usePackageFilterContext } from "@/provider/package-filter-context";

const SortBy = () => {
    const { setPackageFilter } = usePackageFilterContext();
    return (
        <>
            <div className="pt-7 pb-5 space-y-5">
                <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                    <Clock className="size-4" />
                    <span>Duration</span>
                </div>
                <RadioGroup
                    defaultValue="low-high"
                    className="flex"
                    onValueChange={(value) => {
                        if (value === "low-high") {
                            setPackageFilter((prev) => ({
                                ...prev,
                                sortBy: {
                                    value: "duration",
                                    asc: true,
                                },
                            }));
                        } else {
                            setPackageFilter((prev) => ({
                                ...prev,
                                sortBy: {
                                    value: "duration",
                                    asc: false,
                                },
                            }));
                        }
                    }}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="low-high" id="r1" />
                        <Label htmlFor="r1">Low - High</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="high-low" id="r2" />
                        <Label htmlFor="r2">High - Low</Label>
                    </div>
                </RadioGroup>
            </div>
            <Separator className="bg-black/10" />
            <div className="pt-3 pb-5 space-y-5">
                <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                    <HandCoins className="size-4" />
                    <span>Price</span>
                </div>
                <RadioGroup
                    defaultValue="low-high"
                    className="flex"
                    onValueChange={(value) => {
                        if (value === "low-high") {
                            setPackageFilter((prev) => ({
                                ...prev,
                                sortBy: {
                                    value: "price",
                                    asc: true,
                                },
                            }));
                        } else {
                            setPackageFilter((prev) => ({
                                ...prev,
                                sortBy: {
                                    value: "price",
                                    asc: false,
                                },
                            }));
                        }
                    }}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="low-high" id="r1" />
                        <Label htmlFor="r1">Low - High</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="high-low" id="r2" />
                        <Label htmlFor="r2">High - Low</Label>
                    </div>
                </RadioGroup>
            </div>
        </>
    );
};

export default SortBy;
