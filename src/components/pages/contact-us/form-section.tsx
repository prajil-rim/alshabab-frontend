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
        <div className="grid grid-cols-2 max-w-5xl mx-auto py-24">
            <div className="space-y-8">
                <h3 className="text-4xl font-semibold">{contact_title}</h3>
                <div className="font-manrope">
                    <dl className="space-y-5">
                        <dt className="text-primary flex items-center gap-1 text-xl font-semibold">
                            <Call fill="#DA0720" className="size-5" />
                            <span>Phone</span>
                        </dt>
                        <div className="space-y-2">
                            {groupedContact.phone?.map((phone, i) => (
                                <dd key={phone + i}>{phone}</dd>
                            ))}
                        </div>
                        <dt className="text-primary flex items-center gap-1 text-xl font-semibold">
                            <Mail fill="#DA0720" className="size-5" />
                            <span>Email</span>
                        </dt>
                        <div className="space-y-2">
                            {groupedContact.email?.map((mail, i) => (
                                <dd key={mail + i}>{mail}</dd>
                            ))}
                        </div>
                        <dt className="text-primary flex items-center gap-1 text-xl font-semibold">
                            <MapPin fill="#DA0720" className="size-5" />
                            <span>Location</span>
                        </dt>
                        <div className="space-y-2">
                            {groupedContact.location?.map((location, i) => (
                                <dd
                                    className="max-w-[18rem]"
                                    key={location + i}
                                >
                                    {location}
                                </dd>
                            ))}
                        </div>
                    </dl>
                </div>
            </div>
            <div className="space-y-8">
                <ContactUsForm
                    destinations={destinations}
                    packages={packages}
                    formType="form1"
                />
            </div>
        </div>
    );
};

export default FormSection;
