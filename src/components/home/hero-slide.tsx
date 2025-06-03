import { HeroSlideProps } from "@/types";
import { StrapiImage } from "../common/strapi-image";
import Link from "next/link";

const HeroSlide = ({
    title,
    description,
    destination,
    attraction,
    background,
    cta,
}: Readonly<HeroSlideProps>) => {
    return (
        <>
            {background.type == "image" ? (
                <StrapiImage
                    src={background.background.url}
                    alt={
                        background.background.alternativeText ||
                        "No alternative text provided"
                    }
                    width={1920}
                    height={1080}
                />
            ) : (
                <video
                    src={background.background.url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    width={1920}
                    height={1080}
                />
            )}
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{destination}</span>
            <span>{attraction}</span>

            <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
                {cta.text}
            </Link>
        </>
    );
};

export default HeroSlide;
