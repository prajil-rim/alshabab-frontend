"use client";

import ArrowRightUp from "@/components/icons/arrow-right-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SeoContent = ({ content }: { content: string }) => {
    const [expand, setExpand] = useState(false);
    if (!content) return null;
    return (
        <div
            className={cn(
                "mb-10 overflow-hidden relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-white after:via-white after:to-transparent",
                expand ? "h-auto after:hidden" : "h-72"
            )}
        >
            <div
                className="prose max-w-[90%] md:max-w-[80%] mx-auto font-manrope mb-10 real_table"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <Button
                onClick={() => setExpand((prev) => !prev)}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 text-primary font-manrope bg-transparent rounded-full cursor-pointer border border-primary hover:bg-white hover:text-primary"
            >
                {!expand ? "Read more" : "Collapse"}
                <ArrowRightUp color="red" />
            </Button>
        </div>
    );
};

export default SeoContent;
