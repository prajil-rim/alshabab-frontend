import ArrowRightUp from "@/components/icons/arrow-right-up";
import Tags from "@/components/icons/tags";
import { getImage } from "@/lib/utils";
import { DealsProps } from "@/types";
import { Fragment } from "react";

const DealCard = ({ package_ }: { package_: DealsProps }) => {
    return (
        <div
            className="h-96 lg:h-80 rounded-xl bg-cover bg-center relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent overflow-hidden"
            style={{
                backgroundImage: `url(${getImage({
                    local: process.env.PLACEHOLDER_IMAGE!,
                    prod: package_.hero?.background?.url,
                })})`,
            }}
        >
            <div className="flex flex-col justify-between text-white relative z-10 h-full">
                <ul className="flex items-center gap-1 font-manrope text-xs font-semibold bg-white px-3 py-1 rounded-full text-black w-fit ms-auto m-2 lg:m-6">
                    {package_.packages_for.map((value, i) => (
                        <Fragment key={value.id}>
                            <li>{value.label}</li>
                            {i !== package_.packages_for.length - 1 ? (
                                <span>•</span>
                            ) : null}
                        </Fragment>
                    ))}
                </ul>
                <div className="space-y-2 lg:space-y-3 bg-black lg:bg-transparent p-4 lg:p-6">
                    <h6 className="font-semibold text-xl lg:text-3xl">
                        {package_.package}
                    </h6>
                    <p className="font-manrope text-sm">{package_.summary}</p>
                    <div className="flex items-center justify-between font-manrope">
                        <span className="flex items-center lg:text-lg gap-2 font-bold lowercase">
                            <Tags /> AED {package_.price}/{package_.price_per}
                        </span>
                        <ArrowRightUp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealCard;
