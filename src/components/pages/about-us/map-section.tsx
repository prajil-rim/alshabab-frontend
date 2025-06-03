import { StrapiImage } from "@/components/common/strapi-image";
import IndiaMappin from "@/components/icons/india-mappin";
import UAEMappin from "@/components/icons/uae-mappin";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Clock, Phone } from "lucide-react";

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
    return (
        <section className="max-w-6xl mx-auto py-20 space-y-6">
            <h1 className="text-4xl font-semibold text-center">
                {props.title}
            </h1>
            <p className="font-manrope text-center overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                {props.description}
            </p>
            <div className="relative">
                <StrapiImage
                    src="http://localhost:3000/images/others/global_map.jpg"
                    alt="Global Map"
                    width={1024}
                    height={960}
                    className="w-full"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="absolute top-[56%] left-[65.3%] cursor-pointer">
                            <IndiaMappin />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="font-manrope border-2 border-primary w-52 text-center rounded-xl p-4 space-y-2"
                        align="start"
                    >
                        <h4 className="text-primary font-medium">
                            {props.location_2}
                        </h4>
                        <p className="text-xs">{props.address_2}</p>
                        <div className="text-xs flex flex-col text-left mx-auto w-fit">
                            <span className="flex items-center gap-0.5">
                                <Phone
                                    size={10}
                                    className="shrink-0 fill-black"
                                />{" "}
                                {props.phone_2}
                            </span>
                            <span className="flex items-center gap-0.5">
                                <Clock size={10} className="shrink-0" />
                                {props.timing_2}
                            </span>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="absolute top-[49%] left-[59%] cursor-pointer">
                            <UAEMappin />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="font-manrope border-2 border-primary w-52 text-center rounded-xl p-4 space-y-2"
                        align="end"
                    >
                        <h4 className="text-primary font-medium">
                            {props.location_1}
                        </h4>
                        <p className="text-xs">{props.address_1}</p>
                        <div className="text-xs flex flex-col text-left mx-auto w-fit">
                            <span className="flex items-center gap-0.5">
                                <Phone
                                    size={10}
                                    className="shrink-0 fill-black"
                                />{" "}
                                {props.phone_1}
                            </span>
                            <span className="flex items-center gap-0.5">
                                <Clock size={10} className="shrink-0" />
                                {props.timing_1}
                            </span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    );
};

export default MapSection;
