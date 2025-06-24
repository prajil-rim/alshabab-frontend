"use client";

import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
    defaultValue: string;
};

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(value: Locale) {
        const nextLocale = value;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md font-manrope w-fit">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectChange("en")}
                disabled={isPending}
                className={cn(
                    "h-7 px-2 text-xs font-medium transition-all duration-200",
                    defaultValue === "en"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
            >
                EN
            </Button>

            <Button
                variant="ghost"
                size="sm"
                disabled={isPending}
                onClick={() => onSelectChange("ar")}
                className={cn(
                    "h-7 px-2 text-xs font-medium transition-all duration-200",
                    defaultValue === "ar"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
            >
                AR
            </Button>
        </div>
    );
}
