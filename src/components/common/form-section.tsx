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
                "bg-gradient-to-t from-white to-[#F5F1E3]",
                className
            )}
        >
            <div className="max-w-6xl mx-auto py-20 grid grid-cols-2 gap-5 ">
                <div className="space-y-6">
                    <h3 className="text-4xl font-semibold">{heading}</h3>
                    <h4 className="text-2xl font-manrope font-semibold">
                        {heading_2}
                    </h4>
                    <p className="font-manrope max-w-4xl">{description}</p>
                    <Link
                        href={cta.href}
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
                    <PackageConsultationForm packages={packages || []} />
                ) : (
                    <ConsultationForm
                        destinations={destinations || []}
                        packages={packages || []}
                    />
                )}
            </div>
        </section>
    );
};

export default FormSection;
