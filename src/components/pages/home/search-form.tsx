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
import { useTranslations } from "next-intl";
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
    const [selectedPackage, setSelectedPackage] = useState<
        PackageListProps | null | undefined
    >(null);
    const navigate = useRouter();
    const t = useTranslations("homePage.searchSection");

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
                <Select name="destination" required>
                    <SelectTrigger className="flex flex-col justify-start items-start outline-none">
                        <span className="flex items-center gap-2 font-semibold text-lg">
                            {t("destination")} <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder={t("ddes")}
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
                            {t("package")} <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder={t("pdes")}
                            className="!text-[#8D9CC3] text-sm"
                        />
                    </SelectTrigger>
                    <SelectContent className="font-manrope w-full">
                        {packages?.map((package_) => (
                            <SelectItem
                                value={package_.documentId}
                                key={package_.documentId}
                            >
                                {package_.package}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Dollar />
                <Select name="budget" required>
                    <SelectTrigger className="flex flex-col justify-start items-start outline-none">
                        <span className="flex items-center gap-2 font-semibold text-lg">
                            {t("price")} <ChevronDown />{" "}
                        </span>
                        <SelectValue
                            placeholder={t("priceDes")}
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
                {t("button")}
                <div className="rounded-full aspect-square bg-white p-3 h-full flex items-center justify-center">
                    <Search className="text-secondary" />
                </div>
            </Button>
        </form>
    );
};

export default SearchForm;
