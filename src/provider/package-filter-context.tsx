"use client";

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useState,
} from "react";

type PackageFilter = {
    withFlights: boolean;
    budget: number[];
    duration: number[];
    recommendedFor: string[];
    other: "Rest More" | "Travel More";
    sortBy: {
        value: "price" | "duration";
        asc: boolean;
    };
};

const defaultPackageFilter: PackageFilter = {
    withFlights: true,
    budget: [99, 4999],
    duration: [1, 20],
    recommendedFor: [],
    other: "Rest More",
    sortBy: {
        value: "price",
        asc: true,
    },
};

export const PackageFilterContext = createContext<{
    packageFilter: PackageFilter;
    setPackageFilter: Dispatch<SetStateAction<PackageFilter>>;
    setDefault: () => void;
}>({
    packageFilter: defaultPackageFilter,
    setPackageFilter: () => {},
    setDefault: () => {},
});

export const usePackageFilterContext = () => useContext(PackageFilterContext);

export const PackageFilterProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [packageFilter, setPackageFilter] =
        useState<PackageFilter>(defaultPackageFilter);
    function setDefault() {
        setPackageFilter(defaultPackageFilter);
    }
    return (
        <PackageFilterContext.Provider
            value={{ packageFilter, setPackageFilter, setDefault }}
        >
            {children}
        </PackageFilterContext.Provider>
    );
};
