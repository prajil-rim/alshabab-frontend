import ArrowRightUp from "@/components/icons/arrow-right-up";
import WhatsappOutline from "@/components/icons/whatsapp-outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getImage } from "@/lib/utils";
import type { MediaProps, PackageGeneralInfo } from "@/types";
import { Clock, Handshake, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PackageCardProps = {
    package: string;
    slug: string;
    hero: {
        background: MediaProps;
    };
    package_general_info: PackageGeneralInfo;
    package_slug: string;
};

const PackageCard = (pkg: PackageCardProps) => {
    return (
        <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow p-0 hover:border-primary">
            <div className="relative">
                <Image
                    src={pkg.hero.background.url || "/placeholder.svg"}
                    alt={pkg.package}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                <Link
                    href={`https://api.whatsapp.com/send/?phone=${pkg.package_general_info.whatsapp}&text=Hi, I would like to know more about this package, *${pkg.package}*, https://alshababtours.ae/packages/${pkg.slug}&type=phone_number&app_absent=0`}
                    target="_blank"
                >
                    <Button
                        size="sm"
                        className="absolute top-3 right-3 bg-white text-gray-700 hover:bg-gray-50 text-xs px-3 py-1 h-7 rounded-full font-semibold cursor-pointer"
                    >
                        <WhatsappOutline /> Send Enquiry
                    </Button>
                </Link>
            </div>

            <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                <h3 className="font-semibold font-playfair-display text-gray-900 mb-2 leading-tight text-xl">
                    {pkg.package}
                </h3>
                <div className="space-y-2 mb-3 text-[#625F5F] font-medium">
                    <div className="flex items-center text-sm">
                        <Clock className="size-4 mr-2" />
                        {
                            pkg.package_general_info.duration.number_of_nights
                        }{" "}
                        Nights &{" "}
                        {pkg.package_general_info.duration.number_of_days} Days
                    </div>
                    <div className="flex items-center text-sm">
                        <MapPin className="size-4 mr-2" />
                        {
                            pkg.package_general_info.location_details
                                .from_location
                        }{" "}
                        <MoveRight className="size-4 mx-2" />{" "}
                        {pkg.package_general_info.location_details.to_location}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3 text-[#625F5F] font-medium items-center">
                    <Handshake className="size-4 mr-1" />
                    <span className="text-sm">Recommended for</span>
                    {pkg.package_general_info.package_categories.map((tag) => (
                        <Badge
                            key={tag.slug}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-gray-100 text-black rounded-full"
                        >
                            {tag.category}
                        </Badge>
                    ))}
                </div>
                <p className="text-sm text-[#625F5F] mb-3 font-semibold">
                    This package is customizable
                </p>
                <div className="flex items-center gap-3 mb-4 bg-[#F5F1E3] rounded-full w-fit px-2 py-1.5">
                    {pkg.package_general_info?.package_includes?.map(
                        (service) => (
                            <div
                                key={service.id}
                                className="flex items-center gap-1"
                            >
                                <Image
                                    src={getImage({
                                        local: "/local/building.svg",
                                        prod: service.icon.url,
                                    })}
                                    alt="icon"
                                    width={16}
                                    height={16}
                                />
                                <span className="text-xs text-gray-600">
                                    {service.label}
                                </span>
                            </div>
                        )
                    )}
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#625F5F] font-bold">
                            Pay With:
                        </span>
                        <div className="flex items-center gap-2">
                            {pkg.package_general_info.pay_with.tabby && (
                                <Image
                                    src={"/images/pay-with/tabby.webp"}
                                    alt="Tabby"
                                    width={60}
                                    height={20}
                                />
                            )}
                            {pkg.package_general_info.pay_with.tamara && (
                                <Image
                                    src={"/images/pay-with/tamara.webp"}
                                    alt="Tamara"
                                    width={90}
                                    height={20}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-xs text-[#625F5F] font-medium">
                        Starting Price Per Adult:{" "}
                        <span className="line-through font-bold">
                            AED{" "}
                            {
                                pkg.package_general_info.price_details
                                    .base_price_per_adult
                            }
                        </span>
                    </div>
                    <div className="text-lg font-bold text-secondary">
                        AED{" "}
                        {
                            pkg.package_general_info.price_details
                                .offer_price_per_adult
                        }
                    </div>
                </div>
                <div className="pt-3 flex-1 flex items-end">
                    <Link
                        href={`/packages/${pkg.package_slug}/${pkg.slug}`}
                        className="w-full"
                    >
                        <Button
                            variant={"secondary"}
                            className="w-full font-bold cursor-pointer"
                        >
                            View Details <ArrowRightUp color="blue" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default PackageCard;
