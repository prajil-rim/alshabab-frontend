"use client";

import { Button } from "@/components/ui/button";
import { Eraser, HandCoins } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePackageFilterContext } from "@/provider/package-filter-context";

const BudgetFilter = ({ hideEraser = false }: { hideEraser?: boolean }) => {
    const { packageFilter, setPackageFilter } = usePackageFilterContext();

    return (
        <div className="space-y-4 pb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                    <HandCoins className="size-4" />
                    <span>Budget</span>
                </div>
                {!hideEraser && (
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer shadow-none"
                        onClick={() =>
                            setPackageFilter((prev) => ({
                                ...prev,
                                budget: [499, 4999],
                            }))
                        }
                    >
                        <Eraser className="size-3.5 text-primary" />
                    </Button>
                )}
            </div>

            <div className="space-y-2">
                <Slider
                    value={packageFilter.budget}
                    onValueChange={(value) => {
                        setPackageFilter((prev) => ({
                            ...prev,
                            budget: value,
                        }));
                    }}
                    min={499}
                    max={4999}
                    step={100}
                    aria-label="Dual range slider"
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-[#B0AAAA] font-semibold">
                    <span>AED 499</span>
                    <span>AED 4999</span>
                </div>
            </div>
        </div>
    );
};

export default BudgetFilter;
