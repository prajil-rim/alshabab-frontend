import ImageHero from "@/components/hero/image-hero";
import FooterCTA from "@/components/layout/footer-cta";
import FormSection from "@/components/pages/contact-us/form-section";
import LocationSection from "@/components/pages/contact-us/location-section";
import {
    getContactUsPage,
    getDestinationsList,
    getPackagesList,
} from "@/data/loaders";
import { returnMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const runtime = "edge";

let contactUsPageDataPromise: ReturnType<typeof getContactUsPage> | null = null;

function getContactUsPageOnce() {
    if (!contactUsPageDataPromise) {
        contactUsPageDataPromise = getContactUsPage();
    }
    return contactUsPageDataPromise;
}

async function loader() {
    const [data, destinations, packages] = await Promise.all([
        getContactUsPageOnce(),
        getDestinationsList(),
        getPackagesList(),
    ]);
    if (!data || !data.data) notFound();
    return {
        data: data.data,
        destinations: destinations.data,
        packages: packages.data,
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await getContactUsPageOnce();

    return returnMetadata(data);
}

const ContactPage = async () => {
    const { data, destinations, packages } = await loader();

    return (
        <>
            <ImageHero
                background={data.hero?.background}
                description={data.hero?.description}
                title={data.hero?.title}
                breadcrumbs={[
                    {
                        text: "Home",
                        href: "/",
                    },
                    {
                        text: "Contact Us",
                    },
                ]}
            />
            <FormSection
                contact_info={data.contact_info || []}
                contact_title={data.contact_title}
                destinations={destinations || []}
                packages={packages || []}
            />
            <LocationSection {...data.offices_section} />
            <FooterCTA {...data.footer_cta_section} />
        </>
    );
};

export default ContactPage;
