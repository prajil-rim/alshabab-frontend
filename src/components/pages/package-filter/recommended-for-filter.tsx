"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { Clock, Eraser } from "lucide-react";

const RecommendedForFilter = ({
    hideEraser = false,
    packageCategories,
}: {
    hideEraser?: boolean;
    packageCategories: {
        category: string;
        slug: string;
    }[];
}) => {
    const { packageFilter, setPackageFilter } = usePackageFilterContext();

    const handleRecommendationChange = (value: string, checked: boolean) => {
        if (checked) {
            setPackageFilter((prev) => ({
                ...prev,
                recommendedFor: [...prev.recommendedFor, value],
            }));
        } else {
            setPackageFilter((prev) => ({
                ...prev,
                recommendedFor: prev.recommendedFor.filter(
                    (item) => item !== value
                ),
            }));
        }
    };

    return (
        <div className="space-y-4 pb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#625F5F] font-bold text-sm xl:text-base">
                    <Clock className="size-4" />
                    <span>Recommended For</span>
                </div>
                {!hideEraser && (
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full cursor-pointer shadow-none"
                        onClick={() =>
                            setPackageFilter((prev) => ({
                                ...prev,
                                recommendedFor: [],
                            }))
                        }
                    >
                        <Eraser className="size-3.5 text-primary" />
                    </Button>
                )}
            </div>

            <div className="space-y-3">
                {packageCategories?.map((item) => (
                    <div
                        key={item.slug}
                        className="flex items-center space-x-2"
                    >
                        <Checkbox
                            id={item.slug}
                            checked={packageFilter.recommendedFor.includes(
                                item.slug
                            )}
                            onCheckedChange={(checked) =>
                                handleRecommendationChange(
                                    item.slug,
                                    checked as boolean
                                )
                            }
                            className="border-black data-[state=checked]:border-secondary"
                        />
                        <Label htmlFor={item.slug} className="text-gray-900">
                            {item.category}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedForFilter;
