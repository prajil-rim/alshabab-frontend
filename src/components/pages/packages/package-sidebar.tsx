import Headphone from "@/components/icons/headphone";
import WhatsappOutline from "@/components/icons/whatsapp-outline";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ColoredClock from "@/components/icons/clock";
import FareSummary from "./fare-summary";
import type { PackageListProps, PackagePriceDetails } from "@/types";
import PackageFormModal from "@/components/modal/package-form-modal";
import PackageFormSmModal from "@/components/modal/package-form-sm-modal";
import { Link } from "@/i18n/navigation";

type PackageSidebarProps = {
    call_us_on: string;
    whatsapp: string;
    timing: string;
    price_details: PackagePriceDetails;
    packages: PackageListProps[];
    modalData: {
        title: string;
        phone: string;
    };
    locale: string;
};

const PackageSidebar = ({
    whatsapp,
    call_us_on,
    timing,
    price_details,
    packages,
    modalData,
    locale,
}: PackageSidebarProps) => {
    return (
        <div className="sticky top-0 h-[41.6rem] px-3 lg:px-0">
            {/* Fare Summary */}
            <FareSummary price_details={price_details} />

            <div className="my-7 font-manrope space-y-2">
                <div className="hidden lg:block">
                    <PackageFormModal
                        packages={packages || []}
                        locale={locale}
                        modalData={modalData}
                    >
                        <Button className="w-full" variant={"secondary"}>
                            Book Now
                        </Button>
                    </PackageFormModal>
                </div>
                <div className="lg:hidden">
                    <PackageFormSmModal
                        packages={packages || []}
                        locale={locale}
                    >
                        <Button className="w-full" variant={"secondary"}>
                            Book Now
                        </Button>
                    </PackageFormSmModal>
                </div>
                <div className="hidden lg:block">
                    <Link
                        href={`https://api.whatsapp.com/send/?phone=${whatsapp}&text=Hi, I would like to know some details about a package.&type=phone_number&app_absent=0`}
                        target="_blank"
                    >
                        <Button
                            className="w-full bg-transparent border border-secondary text-secondary hover:text-white cursor-pointer"
                            variant={"secondary"}
                        >
                            Send Enquiry
                        </Button>
                    </Link>
                </div>
                <div className="lg:hidden">
                    <PackageFormSmModal
                        packages={packages || []}
                        locale={locale}
                    >
                        <Button
                            className="w-full bg-transparent border border-secondary text-secondary hover:text-white cursor-pointer"
                            variant={"secondary"}
                        >
                            Send Enquiry
                        </Button>
                    </PackageFormSmModal>
                </div>
            </div>

            {/* Need Any Help */}
            <div className="space-y-4 font-manrope">
                <h5 className="font-bold text-lg">Need Any Help?</h5>
                <div className="bg-[#FAFAFA] rounded-md p-4">
                    <div className="flex items-center gap-3">
                        <Headphone />
                        <div className="text-[#202020]">
                            <p className="text-sm opacity-50">Call Us On</p>
                            <span className="font-bold">{call_us_on}</span>
                        </div>
                    </div>
                    <Separator className="my-5" />
                    {timing && (
                        <>
                            <div className="flex items-center gap-3">
                                <ColoredClock />
                                <div className="text-[#202020]">
                                    <p className="text-sm opacity-50">
                                        Timings
                                    </p>
                                    <span className="font-bold">{timing}</span>
                                </div>
                            </div>
                            <Separator className="my-5" />
                        </>
                    )}
                    <div className="flex items-center gap-3 [&_svg:not([class*='size-'])]:size-10">
                        <WhatsappOutline />
                        <div className="text-[#202020]">
                            <p className="text-sm opacity-50">WhatsApp</p>
                            <span className="font-bold">{whatsapp}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSidebar;
