"use client";

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

type PackageDetail = {
    room: number;
    guests: number;
    tourDate?: Date;
};

export const PackagePriceContext = createContext<{
    packageDetail: PackageDetail;
    setPackageDetail: Dispatch<SetStateAction<PackageDetail>>;
}>({
    packageDetail: {
        room: 1,
        guests: 1,
        tourDate: new Date(),
    },
    setPackageDetail: () => {},
});

export const usePackagePriceContext = () => useContext(PackagePriceContext);

export const PackagePriceProvider = ({ children }: { children: ReactNode }) => {
    const [packageDetail, setPackageDetail] = useState<PackageDetail>({
        room: 1,
        guests: 1,
        tourDate: new Date(),
    });
    return (
        <PackagePriceContext.Provider
            value={{ packageDetail, setPackageDetail }}
        >
            {children}
        </PackagePriceContext.Provider>
    );
};
