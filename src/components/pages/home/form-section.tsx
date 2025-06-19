import ContactUsForm from "@/components/forms/contact-us-form";
import ArrowRightUp from "@/components/icons/arrow-right-up";
import KeralaMap from "@/components/icons/kerala-map";
import AlleppyIcon from "@/components/icons/locations/alleppy";
import AthirapallyIcon from "@/components/icons/locations/athirapally";
import FortKochiIcon from "@/components/icons/locations/fort-kochi";
import GaviIcon from "@/components/icons/locations/gavi";
import KovalamIcon from "@/components/icons/locations/kovalam";
import MunnarIcon from "@/components/icons/locations/munnar";
import NelliyampathyIcon from "@/components/icons/locations/nelliyampathy";
import WayandIcon from "@/components/icons/locations/wayand";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DestinationListProps, PackageListProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface FormSectionProps {
    title: string;
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}

const FormSection = ({
    title,
    destinations,
    packages,
}: Readonly<FormSectionProps>) => {
    return (
        <section className="bg-[#ECF4FF] px-3 lg:px-2">
            <div className="relative max-w-6xl mx-auto pb-16 lg:pb-0 pt-16 lg:pt-28 space-y-6 bg-[#ECF4FF]">
                <h1 className="text-2xl font-extrabold lg:text-5xl uppercase max-w-xs mx-auto lg:mx-0 text-center lg:text-left md:max-w-lg leading-tight lg:absolute lg:top-8 lg:left-1/2 lg:-translate-x-[70%]">
                    {title || "No Title"}
                </h1>
                <div className="grid lg:grid-cols-2 gap-3">
                    <div className="aspect-square w-full relative hidden lg:block">
                        <KeralaMap />

                        <LocationToolTip
                            className="absolute top-[72%] left-[61%]"
                            icon={<KovalamIcon />}
                            link={"/destinations/kovalam"}
                            imageUrl="/images/destination-form/kovalam.jpg"
                            imageTitle="Kovalam"
                        />

                        <LocationToolTip
                            className="absolute top-[56%] left-[68%]"
                            icon={<GaviIcon />}
                            link={"/destinations/gavi"}
                            imageUrl="/images/destination-form/gavi.webp"
                            imageTitle="Gavi"
                        />

                        <LocationToolTip
                            className="absolute top-[51%] left-[48%]"
                            icon={<AlleppyIcon />}
                            link={"/destinations/alleppy"}
                            imageUrl="/images/destination-form/alleppy.jpg"
                            imageTitle="Alleppy"
                        />

                        <LocationToolTip
                            className="absolute top-[44%] left-[67%]"
                            icon={<MunnarIcon />}
                            link={"/destinations/munnar"}
                            imageUrl="/images/destination-form/munnar.jpg"
                            imageTitle="Munnar"
                        />

                        <LocationToolTip
                            className="absolute top-[38%] left-[45%]"
                            icon={<FortKochiIcon />}
                            link={"/destinations/fort-kochi"}
                            imageUrl="/images/destination-form/kochi.jpg"
                            imageTitle="FortKochi"
                        />

                        <LocationToolTip
                            className="absolute top-[26%] left-[55%]"
                            icon={<AthirapallyIcon />}
                            link={"/destinations/athirapally"}
                            imageUrl="/images/destination-form/athirapally.jpg"
                            imageTitle="Athirapally"
                        />

                        <LocationToolTip
                            className="absolute top-[16%] left-[48%]"
                            icon={<NelliyampathyIcon />}
                            link={"/destinations/nelliyampathy"}
                            imageUrl="/images/destination-form/nelliyampathy.jpg"
                            imageTitle="Nelliyampathy"
                        />

                        <LocationToolTip
                            className="absolute top-[7%] left-[40%]"
                            icon={<WayandIcon />}
                            link={"/destinations/wayand"}
                            imageUrl="/images/destination-form/wayanad.jpg"
                            imageTitle="Wayand"
                        />
                    </div>
                    <div className="w-full md:w-9/12 md:mx-auto lg:mx-0 lg:w-[90%]">
                        <ContactUsForm
                            destinations={destinations || []}
                            formType="form1"
                            packages={packages || []}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormSection;

function LocationToolTip({
    className,
    icon,
    link,
    imageUrl,
    imageTitle,
}: {
    className: string;
    icon: React.ReactNode;
    link: string;
    imageUrl: string;
    imageTitle: string;
}) {
    return (
        <Tooltip>
            <TooltipTrigger className={cn("absolute", className)}>
                {icon}
            </TooltipTrigger>
            <TooltipContent
                align="center"
                side="right"
                className="p-0 rounded-lg"
            >
                <Link
                    href={link}
                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                >
                    <Image
                        src={imageUrl || process.env.PLACEHOLDER_IMAGE!}
                        alt={imageTitle}
                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                        width={100}
                        height={100}
                    />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                        {imageTitle} <ArrowRightUp color="red" />
                    </span>
                </Link>
            </TooltipContent>
        </Tooltip>
    );
}
