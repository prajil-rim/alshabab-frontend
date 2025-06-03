import {
    type BlocksContent,
    BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import React from "react";

interface BlogContentProps {
    blog: BlocksContent;
    sectionRefs: React.RefObject<{
        [key: string]: HTMLElement | null;
    }>;
}

const BlogContent = ({ blog, sectionRefs }: Readonly<BlogContentProps>) => {
    return (
        <div className="prose lg:prose-lg font-manrope pt-10">
            <BlocksRenderer
                content={blog}
                blocks={{
                    heading: ({ children, level }) => {
                        // @ts-expect-error: children is not always an array
                        const text = children[0].props.text;
                        const id = text.replaceAll(" ", "-").toLowerCase();
                        const Tag =
                            `h${level}` as keyof React.JSX.IntrinsicElements;

                        return React.createElement(
                            Tag,
                            {
                                id,
                                ref: (el: HTMLElement | null) => {
                                    if (el) sectionRefs.current[id] = el;
                                },
                            },
                            children
                        );
                    },
                }}
            />
        </div>
    );
};

export default BlogContent;
