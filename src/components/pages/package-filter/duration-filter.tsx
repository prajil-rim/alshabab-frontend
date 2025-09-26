"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { Clock, Eraser } from "lucide-react";

const DurationFilter = ({ hideEraser = false }: { hideEraser?: boolean }) => {
    const { packageFilter, setPackageFilter } = usePackageFilterContext();

    return (
        <div className="space-y-4 pb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                        <Clock className="size-4" />
                        <span>Duration</span>
                    </div>
                </div>
                {!hideEraser && (
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer shadow-none"
                        onClick={() =>
                            setPackageFilter((prev) => ({
                                ...prev,
                                duration: [1, 20],
                            }))
                        }
                    >
                        <Eraser className="size-3.5 text-primary" />
                    </Button>
                )}
            </div>

            <div className="space-y-2">
                <Slider
                    value={packageFilter.duration}
                    onValueChange={(value) => {
                        setPackageFilter((prev) => ({
                            ...prev,
                            duration: value,
                        }));
                    }}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-[#B0AAAA] font-semibold">
                    <span>Min: 1N</span>
                    <span>Max: 20N</span>
                </div>
            </div>
        </div>
    );
};

export default DurationFilter;
