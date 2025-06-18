"use client";

import Binoculars from "@/components/icons/binoculars";
import Dollar from "@/components/icons/dollar";
import Target from "@/components/icons/target";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { DestinationListProps, PackageListProps } from "@/types";
import { SelectTrigger } from "@radix-ui/react-select";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchFormProps {
    destinations: DestinationListProps[];
    packages: PackageListProps[];
    price_range: {
        id: number;
        label: string;
    }[];
}

const SearchForm = ({
    destinations,
    packages,
    price_range,
}: Readonly<SearchFormProps>) => {
    const [selectedPackages, setSelectedPackages] = useState<
        PackageListProps[]
    >([]);
    const [selectedPackage, setSelectedPackage] = useState<
        PackageListProps | null | undefined
    >(null);
    const navigate = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url =
            "/packages/" +
            selectedPackage?.package.replaceAll(" ", "-").toLowerCase();
        navigate.push(url);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-7 lg:p-2.5 rounded-xl lg:rounded-full flex flex-col lg:flex-row font-manrope gap-7 lg:gap-11"
        >
            <div className="flex items-center gap-2">
                <Target />
                <Select
                    name="destination"
                    required
                    onValueChange={(value) => {
                        setSelectedPackages(
                            packages.filter(
                                (package_) =>
                                    package_.destination.documentId === value
                            )
                        );
                    }}
                >
                    <SelectTrigger className="flex flex-col justify-start items-start outline-none">
                        <span className="flex items-center gap-2 font-semibold text-lg">
                            Destinations <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder="Select your destination"
                            className="!text-[#8D9CC3] text-sm"
                        />
                    </SelectTrigger>
                    <SelectContent className="font-manrope w-full">
                        {destinations?.map((destination) => (
                            <SelectItem
                                value={destination.documentId}
                                key={destination.documentId}
                            >
                                {destination.destination}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Binoculars />
                <Select
                    name="package"
                    required
                    onValueChange={(value) =>
                        setSelectedPackage(
                            packages.find(
                                (package_) => package_.documentId === value
                            )
                        )
                    }
                >
                    <SelectTrigger className="flex flex-col justify-start items-start outline-none">
                        <span className="flex items-center gap-2 font-semibold text-lg">
                            Packages <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder="Select your package"
                            className="!text-[#8D9CC3] text-sm"
                        />
                    </SelectTrigger>
                    <SelectContent className="font-manrope w-full">
                        {selectedPackages?.map((package_) => (
                            <SelectItem
                                value={package_.documentId}
                                key={package_.documentId}
                            >
                                {package_.package}
                            </SelectItem>
                        ))}
                        {selectedPackages?.length === 0 && (
                            <SelectItem value="disabled" disabled>
                                Select a destination first!
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Dollar />
                <Select name="budget" required>
                    <SelectTrigger className="flex flex-col justify-start items-start outline-none">
                        <span className="flex items-center gap-2 font-semibold text-lg">
                            Price <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder="Select your budget"
                            className="!text-[#8D9CC3] text-sm"
                        />
                    </SelectTrigger>
                    <SelectContent className="font-manrope w-full">
                        {price_range.map((price) => (
                            <SelectItem
                                key={price.id}
                                value={price.label.replaceAll(",", "")}
                            >
                                {price.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                type="submit"
                className="w-full lg:w-fit rounded-full text-white text-lg bg-secondary items-center h-auto ms-auto cursor-pointer"
            >
                Find My Adventure
                <div className="rounded-full aspect-square bg-white p-3 h-full flex items-center justify-center">
                    <Search className="text-secondary" />
                </div>
            </Button>
        </form>
    );
};

export default SearchForm;
