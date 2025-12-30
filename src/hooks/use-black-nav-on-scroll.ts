"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { usePathname } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

export function useBlackNavOnScroll(offset = 40) {
    const [isBlack, setIsBlack] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsBlack(false);

        // Kill ONLY triggers created by this hook
        const triggers: ScrollTrigger[] = [];

        const sections =
            document.querySelectorAll<HTMLElement>(".black-nav-section");

        sections.forEach((section) => {
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: `top-=${offset}px top`,
                end: `bottom-=${offset}px top`,
                onEnter: () => setIsBlack(true),
                onLeave: () => setIsBlack(false),
                onEnterBack: () => setIsBlack(true),
                onLeaveBack: () => setIsBlack(false),
            });

            triggers.push(trigger);
        });

        ScrollTrigger.refresh();

        return () => {
            triggers.forEach((t) => t.kill());
            setIsBlack(false);
        };
    }, [pathname, offset]);

    return isBlack;
}
