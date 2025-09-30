"use client";

import type { PackageBannerProps, PackageCardProps } from "@/types";
import Banner from "./banner";
import PackageCard from "./package-card";
import { usePackageFilterContext } from "@/provider/package-filter-context";
import { Info } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const PAGE_SIZE = 12; // adjust per your design

const PackageGrid = ({
    packages,
    parentPackageData,
}: {
    packages: PackageCardProps[];
    parentPackageData: {
        destination_label: string;
        package_banner: PackageBannerProps;
    };
}) => {
    const { packageFilter } = usePackageFilterContext();
    const [page, setPage] = useState(1);

    const filteredPackages = packages.filter((pkg) => {
        const { withFlights, budget, duration, recommendedFor } = packageFilter;

        // ✅ 1. Flights filter
        if (
            withFlights &&
            pkg.package_general_info?.flights !== "With Flight"
        ) {
            return false;
        }
        if (
            !withFlights &&
            pkg.package_general_info?.flights !== "Without Flight"
        ) {
            return false;
        }

        // ✅ 2. Budget filter (assuming package has a `price` field)
        if (budget.length > 0) {
            const price = Number(
                pkg.package_general_info?.price_details.offer_price_per_adult ??
                    0
            );
            if (price < budget[0] || price > budget[1]) {
                return false;
            }
        }

        // ✅ 3. Duration filter (assuming package has `days` field)
        if (duration.length > 0) {
            const days =
                pkg.package_general_info?.duration.number_of_nights ?? 0;
            if (days < duration[0] || days > duration[1]) {
                return false;
            }
        }

        // ✅ 4. RecommendedFor filter (e.g., ["Family", "Couple"])
        if (recommendedFor.length > 0) {
            const tags = pkg.package_general_info?.package_categories ?? [];
            const matches = recommendedFor.some((r) =>
                tags.filter((t) => t.slug === r)
            );
            if (!matches) {
                return false;
            }
        }

        // ✅ 5. "Other" filter (Rest More / Travel More)
        // if (other) {
        //     if (pkg.package_general_info?.other !== other) {
        //         return false;
        //     }
        // }

        return true;
    });

    const sortedPackages = [...filteredPackages].sort((a, b) => {
        const sortBy = packageFilter.sortBy; // "price" or "duration"

        if (sortBy.value === "price") {
            const priceA = Number(
                a.package_general_info?.price_details.offer_price_per_adult ?? 0
            );
            const priceB = Number(
                b.package_general_info?.price_details.offer_price_per_adult ?? 0
            );
            if (sortBy.asc) {
                return priceA - priceB; // ascending
            } else {
                return priceB - priceA; // descending
            }
        }

        if (sortBy.value === "duration") {
            const durationA =
                a.package_general_info?.duration.number_of_nights ?? 0;
            const durationB =
                b.package_general_info?.duration.number_of_nights ?? 0;

            if (sortBy.asc) {
                return durationA - durationB; // ascending
            } else {
                return durationB - durationA; // descending
            }
        }

        return 0; // default no sorting
    });

    // ✅ Reset page to 1 whenever filters change
    useEffect(() => {
        setPage(1);
    }, [packageFilter]);

    // ✅ Pagination logic
    const totalPages = Math.ceil(sortedPackages.length / PAGE_SIZE);
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const currentPageData = sortedPackages.slice(start, end);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPageData.length === 0 ? (
                <div className="md:col-span-2 flex gap-2 items-center justify-center py-10">
                    <Info size={16} /> No packages found!
                </div>
            ) : (
                currentPageData.slice(0, 6).map((pkg) => (
                    <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
                        <PackageCard
                            slug={pkg.slug}
                            package={pkg.package}
                            hero={pkg.hero}
                            package_general_info={pkg.package_general_info}
                        />
                    </Link>
                ))
            )}

            <Banner data={parentPackageData.package_banner} />

            {currentPageData.length > 6 &&
                currentPageData.slice(6).map((pkg) => (
                    <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
                        <PackageCard
                            key={pkg.id}
                            slug={pkg.slug}
                            package={pkg.package}
                            hero={pkg.hero}
                            package_general_info={pkg.package_general_info}
                        />
                    </Link>
                ))}

            {totalPages > 1 && (
                <Pagination className="md:col-span-2">
                    <PaginationContent className="mx-auto">
                        {/* Previous */}
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage((p) => Math.max(p - 1, 1));
                                }}
                            />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href="#"
                                    isActive={p === page}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(p);
                                    }}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Ellipsis (optional if too many pages) */}
                        {totalPages > 5 && <PaginationEllipsis />}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage((p) => Math.min(p + 1, totalPages));
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default PackageGrid;
