import Link from "next/link";
import { Button } from "../ui/button";
import Whatsapp from "../icons/whatsapp";
import PackageConsultationForm from "../forms/package-consultation-form";
import { DestinationListProps, LinkProps, PackageListProps } from "@/types";
import { cn } from "@/lib/utils";
import ConsultationForm from "../forms/consultation-form";

interface FormSectionProps {
    heading: string;
    heading_2?: string;
    description: string;
    cta: LinkProps;
    packages: PackageListProps[];
    destinations?: DestinationListProps[];
    className?: string;
    packageForm?: boolean;
}

const FormSection = ({
    heading,
    heading_2,
    description,
    cta,
    packages,
    destinations,
    className,
    packageForm = true,
}: FormSectionProps) => {
    if (!heading || !packages) return null;

    return (
        <section
            className={cn(
                "bg-gradient-to-t from-white to-[#F5F1E3] px-3 lg:px-2",
                className
            )}
        >
            <div className="max-w-[1824px] mx-auto py-10 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                <div className="space-y-4 lg:space-y-6">
                    <h3 className="text-2xl lg:text-4xl font-semibold">
                        {heading}
                    </h3>
                    <h4 className="text-lg lg:text-2xl font-manrope font-semibold">
                        {heading_2}
                    </h4>
                    <p className="font-manrope max-w-4xl">{description}</p>
                    <Link
                        href={cta?.href || "#"}
                        target={cta.isExternal ? "_blank" : "_self"}
                    >
                        <Button
                            className="bg-white rounded-full shadow-none border border-primary text-primary font-manrope hover:text-primary cursor-pointer"
                            variant={"outline"}
                        >
                            {cta.text} <Whatsapp />
                        </Button>
                    </Link>
                </div>
                {packageForm ? (
                    <div className="ps-1 pe-5 lg:ps-0 lg:pe-0">
                        <PackageConsultationForm packages={packages || []} />
                    </div>
                ) : (
                    <div className="ps-1 pe-5 lg:ps-0 lg:pe-0">
                        <ConsultationForm
                            destinations={destinations || []}
                            packages={packages || []}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSection;
