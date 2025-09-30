"use client";

import PackageFormModal from "@/components/modal/package-form-modal";
import PackageFormSmModal from "@/components/modal/package-form-sm-modal";
import { PackageModifyModal } from "@/components/modal/package-modify-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePackagePriceContext } from "@/provider/package-price-context";
import { PackageListProps } from "@/types";
import { format } from "date-fns";
import { Fragment } from "react";

const PackageHeader = ({
    from_city,
    price_category,
    packages,
    modalData,
    locale,
}: {
    from_city: string;
    price_category: string;
    packages: PackageListProps[];
    modalData: {
        title: string;
        phone: string;
    };
    locale: string;
}) => {
    const { packageDetail } = usePackagePriceContext();
    const data = [
        { label: "From City", value: from_city },
        { label: "Price Category", value: price_category },
        {
            label: "Tour Date",
            value: format(
                packageDetail.tourDate ?? new Date(),
                "dd MMM, yyyy - EEE"
            ),
        },
        {
            label: "Rooms & Guests",
            value: `${packageDetail.room} Rooms & ${packageDetail.guests} Guests`,
        },
    ];

    return (
        <>
            {/* Small screen */}
            <div className="space-y-4 bg-[#FAFAFA] border border-[#757272]/10 lg:rounded-md px-3 py-2 lg:hidden">
                <InfoRow items={data.slice(0, 2)} />
                <Separator />
                <InfoRow items={data.slice(2)} />
                <Separator />
                <ButtonGroup
                    packages={packages}
                    modalData={modalData}
                    locale={locale}
                />
            </div>

            {/* Large screen */}
            <div className="hidden lg:flex justify-between items-center bg-[#FAFAFA] border border-[#757272]/10 rounded-full px-6 py-4 shadow">
                <InfoRow items={data} />
                <ButtonGroup
                    packages={packages}
                    modalData={modalData}
                    locale={locale}
                />
            </div>
        </>
    );
};

export default PackageHeader;

function InfoBlock({ label, value }: { label: string; value: string }) {
    return label === "Tour Date" || label === "Rooms & Guests" ? (
        <PackageModifyModal>
            <button className="text-left cursor-pointer">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#202020]/50">
                        {label}
                    </span>
                    <span className="font-bold">{value}</span>
                </div>
            </button>
        </PackageModifyModal>
    ) : (
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#202020]/50">
                {label}
            </span>
            <span className="font-bold">{value}</span>
        </div>
    );
}

function InfoRow({ items }: { items: { label: string; value: string }[] }) {
    return (
        <div className="flex items-center gap-2 font-manrope h-9 space-x-4">
            {items.map((item, idx) => (
                <Fragment key={item.label}>
                    <div className="flex items-center gap-2">
                        <InfoBlock {...item} />
                    </div>
                    {idx < items.length - 1 && (
                        <Separator orientation="vertical" />
                    )}
                </Fragment>
            ))}
        </div>
    );
}

function ButtonGroup({
    packages,
    modalData,
    locale,
}: {
    packages: PackageListProps[];
    modalData: { title: string; phone: string };
    locale: string;
}) {
    return (
        <div className="font-manrope flex items-center gap-3">
            <div className="hidden lg:block">
                <PackageFormModal
                    packages={packages || []}
                    locale={locale}
                    modalData={modalData}
                >
                    <Button className="bg-white border border-primary rounded-full text-primary hover:bg-primary hover:text-white cursor-pointer flex-3/5 md:flex-auto">
                        Download Package
                    </Button>
                </PackageFormModal>
            </div>
            <div className="lg:hidden">
                <PackageFormSmModal packages={packages || []} locale={locale}>
                    <Button className="bg-white border border-primary rounded-full text-primary hover:bg-primary hover:text-white cursor-pointer flex-3/5 md:flex-auto">
                        Download Package
                    </Button>
                </PackageFormSmModal>
            </div>
            <PackageModifyModal />
        </div>
    );
}
