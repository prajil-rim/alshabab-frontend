"use client";

import { Separator } from "@/components/ui/separator";
import { usePackagePriceContext } from "@/provider/package-price-context";
import type { PackagePriceDetails } from "@/types";

const FareSummary = ({
    price_details,
}: {
    price_details: PackagePriceDetails;
}) => {
    const { packageDetail } = usePackagePriceContext();
    const pricePerRoom = Number(price_details.price_per_room || 1);
    const pricePerAdult = Number(price_details.base_price_per_adult || 1);
    const totalPrice =
        pricePerRoom * packageDetail.room +
        pricePerAdult * packageDetail.guests;
    const discount = (totalPrice * price_details.discount_percentage) / 100;

    return (
        <div className="space-y-4 font-manrope">
            <h5 className="font-bold text-lg">Fare Summary</h5>
            <div className="bg-[#FAFAFA] rounded-md p-4">
                <div className="flex justify-between items-center font-bold">
                    <p className="text-sm">Package Cost</p>
                    <span>AED {Math.round(totalPrice)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between items-center font-bold text-[#202020]/50">
                    <p className="text-sm">Discount</p>
                    <span>AED {Math.round(discount)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-[#202020]/50">
                    <p className="text-sm capitalize">
                        Package cost after discount
                    </p>
                    <span className="whitespace-nowrap">
                        AED {Math.round(totalPrice - discount)}
                    </span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between items-center font-bold">
                    <p className="text-sm">Total Amount</p>
                    <span>AED {Math.round(totalPrice - discount)}</span>
                </div>
            </div>
        </div>
    );
};

export default FareSummary;
