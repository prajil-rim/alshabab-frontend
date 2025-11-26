"use client";

import { Tabs } from "@/components/ui/tabs";
import { dir } from "i18next";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const PackageTab = ({ children }: { children: ReactNode }) => {
    const search = useSearchParams();
    const activeTab = search.get("category") || "all-packages";

    return (
        <Tabs defaultValue={activeTab} dir={dir("en")}>
            {children}
        </Tabs>
    );
};

export default PackageTab;
