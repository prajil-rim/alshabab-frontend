import ContactUsForm from "@/components/forms/contact-us-form";
import Call from "@/components/icons/call";
import Mail from "@/components/icons/mail";
import MapPin from "@/components/icons/map-pin";
import { groupContactInfo } from "@/lib/utils";
import {
    ContactInfoProps,
    DestinationListProps,
    PackageListProps,
} from "@/types";
import Link from "next/link";

interface FormSectionProps {
    contact_title: string;
    contact_info: ContactInfoProps[];
    destinations: DestinationListProps[];
    packages: PackageListProps[];
}

const FormSection = ({
    contact_title,
    contact_info,
    destinations,
    packages,
}: Readonly<FormSectionProps>) => {
    const groupedContact = groupContactInfo(contact_info);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-5 md:gap-0 py-10 lg:py-24 px-5 lg:px-3">
            <div className="space-y-8">
                <h3 className="text-2xl lg:text-4xl font-semibold">
                    {contact_title}
                </h3>
                <div className="font-manrope">
                    <dl className="space-y-2.5 lg:space-y-5">
                        <dt className="text-primary flex items-center gap-1 lg:text-xl font-semibold">
                            <Call fill="#DA0720" className="size-5" />
                            <span>Phone</span>
                        </dt>
                        <div className="space-y-2 text-sm lg:text-base">
                            {groupedContact.phone?.map((phone, i) => (
                                <dd dir="ltr" className="w-fit" key={phone + i}>
                                    <Link href={`tel:${phone}`}>{phone}</Link>
                                </dd>
                            ))}
                        </div>
                        <dt className="text-primary flex items-center gap-1 tlg:text-xl font-semibold">
                            <Mail fill="#DA0720" className="size-5" />
                            <span>Email</span>
                        </dt>
                        <div className="space-y-2 text-sm lg:text-base">
                            {groupedContact.email?.map((mail, i) => (
                                <dd key={mail + i}>
                                    <Link href={`mailto:${mail}`}>{mail}</Link>
                                </dd>
                            ))}
                        </div>
                        <dt className="text-primary flex items-center gap-1 lg:text-xl font-semibold">
                            <MapPin fill="#DA0720" className="size-5" />
                            <span>Location</span>
                        </dt>
                        <div className="space-y-2 text-sm lg:text-base">
                            {groupedContact.location?.map((location, i) => (
                                <dd
                                    className="max-w-[18rem]"
                                    key={location + i}
                                >
                                    <Link
                                        href={`https://www.google.com/maps/search/${location}`}
                                        target="_blank"
                                    >
                                        {location}
                                    </Link>
                                </dd>
                            ))}
                        </div>
                    </dl>
                </div>
            </div>
            <ContactUsForm
                destinations={destinations}
                packages={packages}
                formType="form1"
                locale={""}
            />
        </div>
    );
};

export default FormSection;
