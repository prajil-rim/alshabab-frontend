import ContactUsForm from "@/components/forms/contact-us-form";
import { DestinationListProps, PackageListProps } from "@/types";
import Earth from "./earth";

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
        <section className="bg-[#ECF4FF] px-3 pb-10">
            <div className="relative max-w-7xl mx-auto pb-16 lg:px-6 2xl:px-0 lg:pb-0 pt-16 lg:pt-28 space-y-6 bg-[#ECF4FF]">
                <h1 className="text-2xl font-extrabold lg:text-5xl uppercase max-w-xs mx-auto lg:mx-0 text-center lg:text-left md:max-w-lg leading-tight lg:absolute lg:z-30 lg:top-8 lg:left-1/2 lg:-translate-x-[70%]">
                    {title || "No Title"}
                </h1>
                <div className="grid lg:grid-cols-2 gap-3">
                    <div className="aspect-[1/0.9] w-full relative hidden lg:flex justify-center items-center">
                        <Earth />
                    </div>
                    <div className="w-full md:w-9/12 md:mx-auto lg:mx-0 lg:w-[90%]">
                        <ContactUsForm
                            destinations={destinations || []}
                            formType="form1"
                            packages={packages || []}
                            locale=""
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormSection;
