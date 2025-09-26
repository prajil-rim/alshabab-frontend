"use client";

import { cn } from "@/lib/utils";
import { usePackageFilterContext } from "@/provider/package-filter-context";

interface RadioToggleProps {
    defaultValue?: string;
    className?: string;
}

export function RadioToggle({ defaultValue, className }: RadioToggleProps) {
    const { packageFilter, setPackageFilter } = usePackageFilterContext();

    const selected = packageFilter.other || defaultValue || "Rest More";

    const handleSelect = (option: "Rest More" | "Travel More") => {
        setPackageFilter((prev) => ({ ...prev, other: option }));
    };

    return (
        <div
            className={cn(
                "inline-flex items-center bg-gray-200 rounded-full p-1.5 w-full",
                className
            )}
        >
            {["Rest More", "Travel More"].map((option) => (
                <button
                    key={option}
                    onClick={() =>
                        handleSelect(option as "Rest More" | "Travel More")
                    }
                    className={cn(
                        "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex-1",
                        selected === option
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
