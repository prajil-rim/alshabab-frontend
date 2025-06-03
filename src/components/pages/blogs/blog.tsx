"use client";

import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { useEffect, useRef, useState } from "react";
import { BlogCardProps, MediaProps, SocialsProps } from "@/types";
import { StrapiImage } from "@/components/common/strapi-image";
import Link from "next/link";
import ScrollIndicatorLine from "./scroll-indicator-line";
import SectionLinks from "./section-links";
import BlogContent from "./blog-content";
import BlogCard from "./blog-card";

function getSections(blog: BlocksContent) {
    const sections: {
        id: string;
        title: string;
    }[] = [];
    blog.forEach((block) => {
        if (
            (block.type === "heading" && block.level === 1) ||
            (block.type === "heading" && block.level === 2)
        ) {
            sections.push({
                // @ts-expect-error: children is not always an array
                id: block.children[0].text.replaceAll(" ", "-").toLowerCase(),
                // @ts-expect-error: children is not always an array
                title: block.children[0].text,
            });
        }
    });
    return sections;
}

interface BlogProps {
    author: string;
    description: string;
    image: MediaProps;
    quote: string;
    profession: string;
    socials: SocialsProps[];
    share_socials: SocialsProps[];
    blog: BlocksContent;
    recommendedBlogs: BlogCardProps[];
}

const Blog = ({
    author,
    description,
    image,
    quote,
    profession,
    socials,
    share_socials,
    blog,
    recommendedBlogs,
}: Readonly<BlogProps>) => {
    const sections = getSections(blog);
    const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const observer = useRef<IntersectionObserver | null>(null);
    // Blog sections data

    // Set up intersection observer to detect active section
    useEffect(() => {
        if (!sections.length) return;

        // Check if all refs are available
        const allReady = sections.every(({ id }) => sectionRefs.current[id]);

        if (!allReady) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "0px 0px -50% 0px" }
        );

        sections.forEach(({ id }) => {
            const element = sectionRefs.current[id];
            if (element) {
                observer.current?.observe(element);
            }
        });

        return () => {
            observer.current?.disconnect();
        };
    }, [sections]); // Re-run when `sections` updates and refs are set

    // Scroll to section when clicked in the jumper
    const scrollToSection = (id: string) => {
        const element = sectionRefs.current[id];
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section className="max-w-6xl mx-auto pt-10 py-20">
            <div className="flex gap-20">
                <div className="h-fit sticky top-0 pt-10">
                    <div className="relative w-full">
                        {/* Scroll indicator line */}
                        <ScrollIndicatorLine
                            activeSection={activeSection}
                            sections={sections}
                        />

                        {/* Section links */}
                        <SectionLinks
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                            sections={sections}
                        />
                    </div>

                    <div className="mt-6 space-y-3">
                        <h6 className="font-manrope font-bold text-xl">
                            Share Articles
                        </h6>
                        <ul className="flex gap-3 items-center">
                            {share_socials?.map((social) => (
                                <li key={social.id}>
                                    <StrapiImage
                                        alt={social.label}
                                        // src={social.icon.url}
                                        src={
                                            "http://localhost:3000/images/icons/whatsapp.svg"
                                        }
                                        width={28}
                                        height={28}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 space-y-3 font-manrope">
                        <h6 className="font-bold text-xl">Meet the Author</h6>
                        <div className="rounded-lg bg-[#F5F5F5] p-5 space-y-5 max-w-sm">
                            <div className="flex items-center gap-2">
                                <StrapiImage
                                    // src={image.image.url}
                                    src={
                                        "http://localhost:3000/images/others/avatar.webp"
                                    }
                                    alt={author}
                                    className="rounded-full shrink-0"
                                    width={44}
                                    height={44}
                                />
                                <div className="flex flex-col">
                                    <h6 className="capitalize">{author}</h6>
                                    <span className="text-[#707070] text-sm">
                                        {profession}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]">
                                {description}
                            </p>
                            <div className="text-sm font-bold text-center">
                                &#34;{quote}&#34;
                            </div>
                            <ul className="flex items-center gap-2 flex-wrap justify-center">
                                {socials?.map((social) => (
                                    <li key={social.id}>
                                        <Link
                                            href={social.href}
                                            target={
                                                social.isExternal
                                                    ? "_blank"
                                                    : "_self"
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <StrapiImage
                                                src={
                                                    "http://localhost:3000/images/icons/whatsapp.svg"
                                                }
                                                // src={social.icon.url}
                                                alt={social.label}
                                                width={28}
                                                height={28}
                                            />
                                            <span className="text-[#625F5F]">
                                                {social.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <BlogContent blog={blog} sectionRefs={sectionRefs} />
            </div>
            <div className="space-y-6 mt-20">
                <h3 className="text-2xl font-semibold">Recommended Articles</h3>
                <div className="grid grid-cols-3 gap-10">
                    {recommendedBlogs?.slice(0, 3).map((blog) => (
                        <BlogCard {...blog} key={blog.documentId} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
