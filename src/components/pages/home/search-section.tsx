import TrendingUp from "@/components/icons/trending-up";
import { DestinationListProps, LinkProps, PackageListProps } from "@/types";
import Link from "next/link";
import SearchForm from "./search-form";

interface SearchSectionProps {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    trending_searches: LinkProps[];
    price_range: {
        id: number;
        label: string;
    }[];
}

const SearchSection = ({
    destinations,
    packages,
    trending_searches,
    price_range,
}: Readonly<SearchSectionProps>) => {
    return (
        <div className="space-y-3">
            <SearchForm
                destinations={destinations}
                packages={packages}
                price_range={price_range}
            />
            {trending_searches && trending_searches.length !== 0 && (
                <div className="backdrop-blur-xl rounded-md flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-14 font-manrope p-5 bg-white lg:bg-white/54 max-w-full lg:max-w-[95%] mx-auto">
                    <span className="font-semibold text-xl">
                        Trending Searches
                    </span>
                    <ul className="flex gap-5 items-center flex-1 overflow-x-scroll scrollbar-none">
                        {trending_searches.map((search, index) => (
                            <Link
                                href={search.href}
                                key={index}
                                target={search.isExternal ? "_blank" : "_self"}
                            >
                                <li className="flex items-center gap-1.5 bg-[#EBF4FF] rounded-md px-3 py-1 text-sm font-medium group hover:bg-primary hover:text-white transition-colors duration-300">
                                    <span>{search.text}</span>
                                    <TrendingUp />
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchSection;
