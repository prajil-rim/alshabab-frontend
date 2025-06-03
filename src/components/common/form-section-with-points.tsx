import { DestinationListProps, PackageListProps } from "@/types";
import ConsultationForm from "../forms/consultation-form";
import Map from "../icons/map";
import Pointer from "../icons/pointer";

interface FormSectionWithPointsProps {
    id: number;
    title: string;
    description: string;
    point_1_title: string;
    point_1_description: string;
    point_2_title: string;
    point_2_description: string;
    point_3_title: string;
    point_3_description: string;
    packages: PackageListProps[];
    destinations: DestinationListProps[];
    pointer?: boolean;
}

const FormSectionWithPoints = ({
    title,
    description,
    point_1_title,
    point_1_description,
    point_2_title,
    point_2_description,
    point_3_title,
    point_3_description,
    packages,
    destinations,
    pointer = false,
}: FormSectionWithPointsProps) => {
    if (!title || !packages || !destinations) return null;

    return (
        <section className="bg-gradient-to-t from-[#ECF4FF] to-white">
            <div className="max-w-6xl mx-auto py-20 grid grid-cols-2 gap-5 ">
                <div className="space-y-4">
                    <h3 className="text-4xl font-semibold">{title}</h3>
                    <p className="font-manrope max-w-4xl">{description}</p>
                    <ul className="space-y-8">
                        <li className="flex gap-2">
                            {pointer ? <Pointer /> : <Map />}
                            <div className="space-y-4">
                                <h6 className="font-semibold text-2xl">
                                    {point_1_title}
                                </h6>
                                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                                    {point_1_description}
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            {pointer ? <Pointer /> : <Map />}
                            <div className="space-y-4">
                                <h6 className="font-semibold text-2xl">
                                    {point_2_title}
                                </h6>
                                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                                    {point_2_description}
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            {pointer ? <Pointer /> : <Map />}
                            <div className="space-y-4">
                                <h6 className="font-semibold text-2xl">
                                    {point_3_title}
                                </h6>
                                <p className="font-manrope overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                                    {point_3_description}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <ConsultationForm
                    packages={packages || []}
                    destinations={destinations || []}
                />
            </div>
        </section>
    );
};

export default FormSectionWithPoints;
