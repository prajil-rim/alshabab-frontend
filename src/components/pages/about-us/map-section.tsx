import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Clock, Phone } from "lucide-react";
import Image from "next/image";

interface MapSectionProps {
    title: string;
    description: string;
    location_1: string;
    location_2: string;
    phone_1: string;
    phone_2: string;
    address_1: string;
    address_2: string;
    timing_1: string;
    timing_2: string;
}

const MapSection = (props: Readonly<MapSectionProps>) => {
    if (!props) return null;

    return (
        <section className="max-w-6xl mx-auto py-10 space-y-3 lg:space-y-6">
            <h1 className="text-2xl lg:text-4xl font-semibold text-center px-3 lg:px-6 2xl:px-0">
                {props?.title}
            </h1>
            <p className="font-manrope text-center px-3">
                {props?.description}
            </p>
            <div className="relative">
                <div className="w-full overflow-hidden">
                    <Image
                        src="/images/others/global_map.jpg"
                        alt="Global Map"
                        width={1024}
                        height={960}
                        className="w-full sm:scale-100 scale-[1.8] origin-[70%_50%]"
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="absolute max-[321px]:top-[50%] max-[376px]:top-[51%] max-[321px]:left-[59.5%] max-[376px]:left-[60%] max-[426px]:top-[55%] max-[530px]:top-[56%] max-[530px]:left-[61%] max-[590px]:top-[58%] max-[590px]:left-[61.5%] max-[639px]:top-[60%] max-[639px]:left-[62%] max-[730px]:top-[51%] max-[730px]:left-[64.5%] max-[820px]:top-[52.5%] max-[820px]:left-[65%] max-[900px]:top-[53.5%] max-[900px]:left-[65%] max-[1024px]:top-[54%] max-[1024px]:left-[65.2%] max-[1280px]:top-[55%] max-[1280px]:left-[65.5%] xl:top-[56%] xl:left-[65.6%] cursor-pointer">
                            <Image
                                src={"/images/icons/india-mappin.png"}
                                alt="India Flag pin"
                                width={32}
                                height={36}
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="font-manrope border-2 border-primary w-52 text-center rounded-xl p-4 space-y-2"
                        align="start"
                    >
                        <h4 className="text-primary font-medium">
                            {props?.location_2}
                        </h4>
                        <p className="text-xs">{props?.address_2}</p>
                        <div className="text-xs flex flex-col text-left mx-auto w-fit">
                            <span className="flex items-center gap-0.5">
                                <Phone
                                    size={10}
                                    className="shrink-0 fill-black"
                                />{" "}
                                {props?.phone_2}
                            </span>
                            <span className="flex items-center gap-0.5">
                                <Clock size={10} className="shrink-0" />
                                {props?.timing_2}
                            </span>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="absolute cursor-pointer max-[370px]:top-[40%] max-[370px]:left-[48.5%] max-[410px]:top-[43%] max-[500px]:top-[44%] max-[500px]:left-[50%] max-[590px]:top-[46%] max-[590px]:left-[50.5%] max-[639px]:top-[48%] max-[639px]:left-[51%] max-[730px]:top-[45%] max-[730px]:left-[58.5%] max-[810px]:top-[46%] max-[810px]:left-[59%] max-[900px]:top-[47%] max-[900px]:left-[59%] max-[1024px]:top-[48%] max-[1024px]:left-[59.5%] max-[1280px]:top-[49%] max-[1280px]:left-[59.5%] xl:top-[49.5%] xl:left-[59.5%]">
                            <Image
                                src={"/images/icons/uae-mappin.png"}
                                alt="UAE Flag pin"
                                width={32}
                                height={36}
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="font-manrope border-2 border-primary w-52 text-center rounded-xl p-4 space-y-2"
                        align="end"
                    >
                        <h4 className="text-primary font-medium">
                            {props?.location_1}
                        </h4>
                        <p className="text-xs">{props?.address_1}</p>
                        <div className="text-xs flex flex-col text-left mx-auto w-fit">
                            <span className="flex items-center gap-0.5">
                                <Phone
                                    size={10}
                                    className="shrink-0 fill-black"
                                />{" "}
                                {props?.phone_1}
                            </span>
                            <span className="flex items-center gap-0.5">
                                <Clock size={10} className="shrink-0" />
                                {props?.timing_1}
                            </span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    );
};

export default MapSection;
