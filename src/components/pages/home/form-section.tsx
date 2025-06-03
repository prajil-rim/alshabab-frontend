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
import Image from "next/image";
import Link from "next/link";

const FormSection = () => {
    return (
        <section className="bg-[#ECF4FF]">
            <div className="relative max-w-6xl mx-auto pt-28 space-y-6 bg-[#ECF4FF]">
                <h1 className="font-extrabold text-5xl uppercase max-w-lg leading-tight absolute top-8 left-1/2 -translate-x-[70%]">
                    Plan your dream trip with us
                </h1>
                <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square w-full relative">
                        <KeralaMap />
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[72%] left-[61%]">
                                <KovalamIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Kovalam"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap">
                                        KOVALAM BEACH{" "}
                                        <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[56%] left-[68%]">
                                <GaviIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Gavi"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Gavi <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[51%] left-[48%]">
                                <AlleppyIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Alleppy"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Alleppy <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[44%] left-[67%]">
                                <MunnarIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Munnar"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Munnar <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[38%] left-[45%]">
                                <FortKochiIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="FortKochi"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        FortKochi <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[26%] left-[55%]">
                                <AthirapallyIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Athirapally"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Athirapally <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[16%] left-[48%]">
                                <NelliyampathyIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Nelliyampathy"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Nelliyampathy{" "}
                                        <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger className="absolute top-[7%] left-[40%]">
                                <WayandIcon />
                            </TooltipTrigger>
                            <TooltipContent
                                align="center"
                                side="right"
                                className="p-0 rounded-lg"
                            >
                                <Link
                                    href={"/"}
                                    className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 via-black/30 after:to-transparent after:z-10 after:rounded-lg"
                                >
                                    <Image
                                        src="/images/others/card_1.webp"
                                        alt="Wayand"
                                        className="w-48 aspect-[1/0.7] rounded-lg object-cover object-center"
                                        width={192}
                                        height={190}
                                    />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-manrope z-20 m-3 flex items-center gap-2 whitespace-nowrap uppercase">
                                        Wayand <ArrowRightUp color="red" />
                                    </span>
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="w-[90%]">
                        <ContactUsForm
                            destinations={[]}
                            formType="form1"
                            packages={[]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormSection;
