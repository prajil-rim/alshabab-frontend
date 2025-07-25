import Quote from "@/components/icons/quote";
import { StrapiImage } from "../strapi-image";
import { TestimonialProps } from "@/types";
import { getImage } from "@/lib/utils";

const TestimonialCard = ({
    image,
    testimonial,
    location,
    user,
}: Readonly<TestimonialProps>) => {
    return (
        <div className="border text-base md:text-sm h-full border-primary lg:border-[#666666]/20 rounded-[20px] aspect-square flex items-center justify-center p-5 text-center flex-col group hover:border-primary hover:shadow-xl">
            <p className="mt-auto font-manrope">{testimonial}</p>
            <div className="flex items-center gap-2 mt-auto">
                <StrapiImage
                    alt={image.alternativeText || ""}
                    src={getImage({
                        local: process.env.PLACEHOLDER_IMAGE!,
                        prod: image.url,
                    })}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col items-start">
                    <span className="text-sm">{user}</span>
                    <span className="font-manrope text-xs">{location}</span>
                </div>
            </div>
            <Quote />
        </div>
    );
};

export default TestimonialCard;
